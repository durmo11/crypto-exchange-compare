import bittrex from 'node.bittrex.api';
import autobahn from 'autobahn';
const poloniexURI = 'wss://api.poloniex.com';
export default class SocketEvents {
  constructor() {
    this.exchangeData = {};
  }
  getDataFromExchanges(socket, tradingPairs) {
    this.subscribeToBittrex(socket, tradingPairs);
    this.subscribeToPoloniex(socket, tradingPairs);
    this.subscribeToBitfinex(socket, tradingPairs);
  }
  updateExhangeData(tradingPairs, pair, price, exchange, socket) {
    pair = exchange == 'Poloniex' || exchange == 'Bitfinex'?  this.standarizeTradePairs(pair, exchange) : pair;
    if (tradingPairs.includes(pair)) {
       if (!(pair in this.exchangeData)) {
         this.exchangeData[pair] = {};
       }
       this.exchangeData[pair][exchange] = price;
       this.emitExchangeData(this.exchangeData[pair], socket);

    }
  }
  standarizeTradePairs(pair, exchange) {
    pair = pair == 'DSHBTC' ? 'BTC-DASH' : exchange == 'Poloniex' ? pair.replace('_', '-') : pair.substr(pair.length-3)+'-'+pair.substr(0,3);
    return pair;
  }
  subscribeToBittrex(socket, tradingPairs) {
    let pair;
    let price;
    bittrex.websockets.listen((data) => {
      console.log('Connection to Bifinex is open');
      if (data.M === 'updateSummaryState') {
        data.A.forEach((data_for) => {
          data_for.Deltas.forEach((marketsDelta) => {
            pair = marketsDelta.MarketName;
            price = marketsDelta.Ask;
            this.updateExhangeData(tradingPairs, pair, price,'Bittrex', socket);
          });
        });
      }
      this.socket.broadcast.emit( 'bittrex data', { pair: price});
      // socket.broadcast.emit('exchange data', this.exchangeData);
    });
  }
  subscribeToPoloniex(socket, tradingPairs) {
    const connectionToPoloniex = new autobahn.Connection({
      url: poloniexURI,
      realm: "realm1"
    });
    connectionToPoloniex.open();
    connectionToPoloniex.onopen = (session) => {
      console.log('Connection to Poloniex is open');
      // console.log('Session', session);
      session.subscribe('ticker', (data,kwargs) => {
        let pair = data[0];
        // Appropriate labels for these data are, in order: currencyPair, last, lowestAsk, highestBid, percentChange, baseVolume, quoteVolume, isFrozen, 24hrHigh, 24hrLow
        this.updateExhangeData(tradingPairs, pair, data[2],'Poloniex', socket);
        // socket.broadcast.emit('exchange data', this.exchangeData);
      });

    };
    connectionToPoloniex.onclose = (reason,details) => {
      console.log("Websocket connection closed", reason, details);
    };
  }
  subscribeToBitfinex(socket, tradingPairs) {
    const BFX = require('bitfinex-api-node');
    const opts = {
      version: 2,
      transform: true
    };
    const bws = new BFX(opts).ws;

    bws.on('open', () => {
      console.log('Connection to Bifinex is open');
      bws.subscribeTicker('LTCBTC');
      bws.subscribeTicker('ETHBTC');
      bws.subscribeTicker('DSHBTC');
    });
    bws.on('ticker', (pair, ticker) => {
      this.updateExhangeData(tradingPairs, pair, ticker.ask, 'Bitfinex', socket);

    });
    bws.on('error', console.error);
  }
  emitExchangeData(marketPair, socket) {
    if (Object.keys(marketPair).length > 2) {
      let pricesArray = Object.values(marketPair).slice(0,3);
      let bestPrice = Math.min(...pricesArray);
      if (marketPair['Bittrex'] == bestPrice) {
        marketPair['Best_Rate'] = {
          'Exchange': 'Bittrex',
          'Price': bestPrice
        }
      } else if(marketPair['Poloniex'] == bestPrice) {
          marketPair['Best_Rate'] = {
            'Exchange': 'Poloniex',
            'Price': bestPrice
          }
      } else {
          marketPair['Best_Rate'] = {
            'Exchange': 'Bitfinex',
            'Price': bestPrice
          }
      }
      console.log('Exchange data', this.exchangeData);
      socket.broadcast.emit('exchange data', this.exchangeData);
    } else {
      console.log('Waiting on data from all three exchanges...');
    }
  }
}
