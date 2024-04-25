const crypto = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const PORT = 3001;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bookingiasi'
});

connection.connect((err) => {
  if (err) {
      console.error('Error connecting to database:', err);
      return;
  }
  console.log('Connected to the database');
});

app.use(cors());
app.use(bodyParser.json());


app.post('/login', (req, res) => {
  const { username, password } = req.body;

  connection.query('SELECT * FROM users WHERE username = ? LIMIT 1', [username], (error, results, fields) => {
      if (error) {
          console.error('Error querying database:', error);
          res.send({ success: false, message: 'An error occurred while logging in. Please try again later.' });
          return;
      }
      
      if (results.length === 0) {
          res.send({ success: false, message: 'Login failed! Username not found.' });
          return;
      }

      const userPasswordFromDB = results[0].password; 

      const hash = crypto.createHash('md5');
      hash.update(password);
      const hashedPassword = hash.digest('hex');

      if (hashedPassword === userPasswordFromDB) {
          res.send({ success: true, message: 'Login successful!' });
      } else {
          res.send({ success: false, message: 'Login failed! Invalid credentials.' });
      }
  });
});

app.post('/signup', (req, res) => {
  const { givenName, familyName, username, email, password } = req.body;

  connection.query('SELECT * FROM users WHERE username = ? LIMIT 1', [username], (error, results, fields) => {
      if (error) {
          console.error('Error querying database:', error);
          res.status(500).json({ success: false, message: 'An error occurred while signing up. Please try again later.' });
          return;
      }
      
      if (results.length > 0) {
          res.status(400).json({ success: false, message: 'Signup failed! Username already exists.' });
          return;
      }

      const hash = crypto.createHash('md5');
      hash.update(password);
      const hashedPassword = hash.digest('hex');

      connection.query('INSERT INTO users (givenName, familyName, username, email, password) VALUES (?, ?, ?, ?, ?)', [givenName, familyName, username, email, hashedPassword], (error, results, fields) => {
          if (error) {
              console.error('Error inserting user into database:', error);
              res.status(500).json({ success: false, message: 'An error occurred while signing up. Please try again later.' });
              return;
          }

          res.status(200).json({ success: true, message: 'Signup successful!' });
      });
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
