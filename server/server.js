const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const userEmail = "cezarateofana@gmail.com";
const userPassword = "buna";

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  let isAuthenticated = false;
  if (userEmail === email && userPassword === password) {
    isAuthenticated = true;
  }

  if (isAuthenticated) {
    res.send({ success: true, message: 'Login successful' });
  } else {
    res.status(401).send({ success: false, message: 'Login failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
