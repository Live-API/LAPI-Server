const express = require('express');
const app = express();

const PORT = 4000;

app.get('/', (req, res) => {
    res.send('Home page');
});

app.get('/config', (req, res) => {
  res.send('config page');
});

app.listen(PORT, () => {
    console.log(`App is listening on Port ${PORT}`);
});