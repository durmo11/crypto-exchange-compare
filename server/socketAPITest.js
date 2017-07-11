const express = require('express');
const socketClient = require('socket.io-client');
const port = 5000;
const app = express();
const socket = socketClient('http://localhost:3000');

let temp = (callback) => {
  m = 20;
  callback(m);
}
let tempResult = temp((data) => {
  console.log('Data', data);
});

const server = app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    // open(`http://localhost:${port}`);
    console.log('Server listening on port:', port);
  }
});
// socket.on('exchange data', (exchangeData) => {
//   console.log('Exchange Data', exchangeData);
// })
