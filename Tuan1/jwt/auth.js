const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const privateKey = fs.readFileSync('./private.pem', 'utf8');

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === '123456') {
    const payload = {
      sub: username,
      role: 'admin'
    };
    const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.listen(4000, () => {
  console.log('JWT Auth server running on port 4000');
});
