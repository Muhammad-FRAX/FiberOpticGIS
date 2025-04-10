// backend/server.js

require('dotenv').config(); // Loads variables from .env

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ldap = require('ldapjs');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const neo4j = require('neo4j-driver'); 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Rate limiting middleware
const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: 'Too many login attempts please try again after 5 minutes'
});

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Neo4j section

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

// Function to execute Neo4j queries : update dependency
const executeNeo4jQueries = async () => {
  const session = driver.session();
  try {
    await session.run(`
      MATCH (d:Device)<-[r:LINKED_WITH {ranking: 'MAIN'}]-(:Device)
      WITH d, collect(r.status) AS statuses
      WHERE ALL(s IN statuses WHERE s = 'DOWN')
      SET d.status = 'DOWN';
    `);

    await session.run(`
      MATCH (source:Device)-[r:LINKED_WITH {ranking: 'MAIN'}]->(target:Device)
      WHERE source.status = 'DOWN'
      SET r.status = 'DOWN';
    `);

  
  } catch (error) {
    console.error('Error executing Neo4j queries:', error);
  } finally {
    await session.close();
  }
};

// Function to fetch down counts
const fetchDownCounts = async () => {
  const session = driver.session();
  try {
    const result = await session.run(`
      MATCH (d:Device)
      WHERE d.status = 'DOWN'
      RETURN count(d) AS count, 'devices' AS type
      UNION ALL
      MATCH ()-[r:LINKED_WITH]->()
      WHERE r.status = 'DOWN'
      RETURN count(r) AS count, 'links' AS type
    `);

    //console.log('Query result:', result.records); // Log the query result

    const downDevicesRecord = result.records.find(record => record.get('type') === 'devices');
    const downLinksRecord = result.records.find(record => record.get('type') === 'links');

    const downDevices = downDevicesRecord ? downDevicesRecord.get('count').toInt() : 0;
    const downLinks = downLinksRecord ? downLinksRecord.get('count').toInt() : 0;

    //console.log('Down Devices:', downDevices); // Log the down devices count
    //console.log('Down Links:', downLinks); // Log the down links count
    

    return { downDevices, downLinks };
  } catch (error) {
    console.error('Error fetching down counts:', error);
  } finally {
    await session.close();
  }
};

// Set up a timer to execute the Neo4j queries every 2 seconds
setInterval(async () => {
  await executeNeo4jQueries();
  await fetchDownCounts();
}, 2000);

app.get('/down-counts', async (req, res) => {
  try {
    const counts = await fetchDownCounts();
    res.json(counts);
  } catch (error) {
    console.error('Error fetching down counts:', error);
    res.status(500).json({ error: 'Failed to fetch down counts' });
  }
});

app.post('/login', loginLimiter, (req, res) => {
  const { username, password } = req.body;
  

  // Validate the username and password
  if (
    username.trim() === "" || 
    password.trim() === "" || 
    username.includes(" ")
  ) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Append domain if missing
  const userPrincipalName = username.includes('@') ? username : `${username}@sd.zain.com`;
  if (username === process.env.LDAP_USERNAME && password === process.env.LDAP_PASSWORD) {
    const token = jwt.sign({ username: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ message: 'Authenticated!', token });
  }
  const client = ldap.createClient({
    url: process.env.LDAP_URL,
    timeout: 5000,
    connectTimeout: 10000
  });

  console.log('--- going to try to connect user ---');
  console.log(`LDAP URL: ${process.env.LDAP_URL}`);
  console.log(`User Principal Name: ${userPrincipalName}`);

  try {
    client.bind(userPrincipalName, password, (error) => {
      if (error) {
        console.log('Bind error:', error.message);
        client.unbind((unbindError) => {
          if (unbindError) {
            console.log('Unbind error:', unbindError.message);
          } else {
            console.log('client disconnected');
          }
        });
        return res.status(401).json({ message: 'Log in Failed' });
      } else {
        console.log('success');
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        client.unbind((unbindError) => {
          if (unbindError) {
            console.log('Unbind error:', unbindError.message);
          } else {
            console.log('client disconnected');
          }
        });
        return res.json({ message: 'Authenticated!', token });
      }
    });
  } catch (error) {
    console.log('Catch error:', error.message);
    client.unbind((unbindError) => {
      if (unbindError) {
        console.log('Unbind error:', unbindError.message);
      } else {
        console.log('client disconnected');
      }
    });
    return res.status(500).json({ message: 'Authentication failed', error: 'An error occurred during authentication' });
  }
});

// just a testing part to test the tokens
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Neo4j query endpoint
app.post('/api/neo4j/query', async (req, res) => {
  const session = driver.session();
  try {
    const { query } = req.body;
    //console.log('Received Neo4j query:', query);
    
    const result = await session.run(query);
   // console.log('Raw Neo4j result:', result.records);
    
    // Transform the result to a more usable format
    const data = result.records.map(record => {
      const obj = {};
      record.keys.forEach(key => {
        const value = record.get(key);
        if (value && typeof value === 'object') {
          if (value.properties) {
            // Handle node properties
            obj[key] = value.properties;
          } else if (value.identity) {
            // Handle node with no properties
            obj[key] = {};
          } else {
            // Handle other values
            obj[key] = value;
          }
        } else {
          // Handle primitive values
          obj[key] = value;
        }
      });
      return obj;
    });
    
    //console.log('Transformed data:', data);
    res.json(data);
  } catch (error) {
    console.error('Error executing Neo4j query:', error);
    res.status(500).json({ error: 'Failed to execute Neo4j query' });
  } finally {
    await session.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//before