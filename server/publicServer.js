import express from 'express';
import path from 'path';
import open from 'open';
import favicon from 'serve-favicon';
import socketIO from 'socket.io';
import routes from './api/index.route';
import ExchangeSocketApi from './exchangeAPI/exchangeEvents';
import compression from 'compression';

const router = express.Router();
const exchangeSocketApi = new ExchangeSocketApi();
const port = 3000;
const app = express();
app.use(compression());
app.use(express.static('public'));
// mount all routes on /api path
app.use('/api', routes);

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../public/index.html'));
});

const server = app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
    console.log('Server runnning on port', port);
  }
});
let tradingPairs = ['BTC-ETH','BTC-DASH', 'BTC-LTC'];
const io = socketIO(server);
io.on('connection', (socket) => {
  // console.log('Front end connected');
  // exchangeSocketApi.subscribeToBittrex(socket);
  // exchangeSocketApi.subscribeToPoloniex(socket);
  exchangeSocketApi.getDataFromExchanges(socket, tradingPairs);

});
