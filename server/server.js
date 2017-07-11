import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import favicon from 'serve-favicon';
import socketIO from 'socket.io';
import routes from './api/index.route';
import ExchangeSocketApi from './exchangeAPI/exchangeEventsV2';

const router = express.Router();
const exchangeSocketApi = new ExchangeSocketApi();
const port = 3000;
const app = express();
const compiler = webpack(config);
// mount all routes on /api path
app.use('/api', routes);
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../client/index.html'));
});

const server = app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    // open(`http://localhost:${port}`);
    console.log('Server runnning on port', port);
  }
});
let tradingPairs = ['BTC-ETH','BTC-DASH', 'BTC-LTC'];
const io = socketIO(server);
io.on('connection', (socket) => {
  // console.log('Front end connected');
  // exchangeSocketApi.subscribeToBittrex(tradingPairs, (data) => {
  //   socket.broadcast.emit('bittrex data', data);
  // });
  // exchangeSocketApi.subscribeToPoloniex(tradingPairs, (data) => {
  //   socket.broadcast.emit('poloniex data', data);
  // });
  // exchangeSocketApi.subscribeToBitfinex(tradingPairs, (data) => {
  //   socket.broadcast.emit('bitfinex data', data);
  //   console.log('Bitfinex data', data);
  // });
  exchangeSocketApi.listenDataFromExchanges(tradingPairs, (data) => {
    console.log('All Exchange data', data);
    socket.broadcast.emit('exchange data', data);
  });
  // exchangeSocketApi.getDataFromExchanges(socket, tradingPairs);

});
