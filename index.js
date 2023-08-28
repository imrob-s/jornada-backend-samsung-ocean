const express = require('express')
const app = express()

// Endpoint Principal
app.get('/', function (req, res) {
  res.send('Hello World')
});

//Endpoint /oi
app.get('/oi', function (req, res) {
    res.send('Olá Mundo!')
  });

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));