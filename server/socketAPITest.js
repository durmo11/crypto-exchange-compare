const express = require('express');
const socketClient = require('socket.io-client');
const port = 5000;
const app = express();
const socket = socketClient('http://localhost:3000');

const server = app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    // open(`http://localhost:${port}`);
    console.log('Server listening on port:', port);
  }
});
socket.on('exchange data', (exchangeData) => {
  console.log('Exchange Data', exchangeData);
})
