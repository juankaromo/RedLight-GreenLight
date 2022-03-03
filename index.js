const express = require('express');
const app = express();
app.use(express.static(__dirname + '/'));
app.listen('8000', function() {
  console.log('Servidor web en el puerto 8000');
});