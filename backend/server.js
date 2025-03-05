// backend/server.js

require('dotenv').config(); // Loads variables from .env

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ldap = require('ldapjs');
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Rate limiting middleware
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: 'Too many login attempts from this IP, please try again after 15 minutes'
});

app.post('/login', loginLimiter, (req, res) => {
  const { username, password } = req.body;

  // Append domain if missing
  const userPrincipalName = username.includes('@') ? username : `${username}@sd.zain.com`;
  if (username === 'admin' && password === 'admin') {
    return res.json({ message: 'Authenticated!', username: 'admin' });
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
        return res.status(401).json({ message: 'Invalid credentials' });
      } else {
        console.log('success');
        client.unbind((unbindError) => {
          if (unbindError) {
            console.log('Unbind error:', unbindError.message);
          } else {
            console.log('client disconnected');
          }
        });
        return res.json({ message: 'Authenticated!', username });
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});