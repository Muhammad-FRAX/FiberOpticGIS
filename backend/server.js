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
  max: 5, // Limit each IP to 5 login requests
  message: 'Too many login attempts from this Device, please try again after 15 minutes'
});

app.post('/login', loginLimiter, (req, res) => {
  const { username, password } = req.body;

  // admin user that is used for testing
  if (username === 'admin' && password === 'admin') {
    return res.json({ message: 'Authenticated!', username: 'admin' });
  }

  ldap.Attribute.settings.guid_format = ldap.GUID_FORMAT_B;
  const client = ldap.createClient({
    url: process.env.LDAP_URL,
    timeout: 5000,
    connectTimeout: 10000
  });

  const opts = {
    filter: `(&(objectclass=user)(samaccountname=${ldap.escape(username)}))`,
    scope: 'sub',
    attributes: ['objectGUID']
  };

  console.log('--- going to try to connect user ---');

  try {
    client.bind(username, password, (error) => {
      if (error) {
        console.log(error.message);
        client.unbind((unbindError) => {
          if (unbindError) {
            console.log(unbindError.message);
          } else {
            console.log('client disconnected');
          }
        });
        return res.status(401).json({ message: 'Invalid credentials' });
      } else {
        console.log('connected');
        client.search(process.env.LDAP_BASE_DN, opts, (searchError, search) => {
          if (searchError) {
            console.error('error: ' + searchError.message);
            return res.status(500).json({ message: 'Search error', error: 'An error occurred while searching' });
          }

          search.on('searchEntry', (entry) => {
            if (entry.object) {
              console.log('entry: %j ' + JSON.stringify(entry.object));
            }
          });

          search.on('error', (searchError) => {
            console.error('error: ' + searchError.message);
          });

          client.unbind((unbindError) => {
            if (unbindError) {
              console.log(unbindError.message);
            } else {
              console.log('client disconnected');
            }
          });

          return res.json({ message: 'Authenticated!', username });
        });
      }
    });
  } catch (error) {
    console.log(error);
    client.unbind((unbindError) => {
      if (unbindError) {
        console.log(unbindError.message);
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