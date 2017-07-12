import bittrex from 'node.bittrex.api';
import autobahn from 'autobahn';
const poloniexURI = 'wss://api.poloniex.com';

let allExchangesProperty = Symbol('Symbol to limit the access to internal property');
export default class SocketEvents {
  constructor() {
    this.exchangeData = {};
    this[allExchangesProperty] = 'allExchanges';
  }
  listenDataFromExchanges(tradingPairs, callback) {
    this.subscribeToBittrex(tradingPairs, callback, this[allExchangesProperty]);
    this.subscribeToPoloniex(tradingPairs, callback,this[allExchangesProperty] );
    this.subscribeToBitfinex(tradingPairs, callback,this[allExchangesProperty] );

  }
  subscribeToBittrex(tradingPairs, callback, allExchangesProperty) {
    let pair;
    let price;
    const exchange = 'Bittrex';
    try {
      bittrex.websockets.listen((data) => {
        console.log('Connection to Bitfinex is open');
        if (data.M === 'updateSummaryState') {
          data.A.forEach((data_for) => {
            data_for.Deltas.forEach((marketsDelta) => {
              pair = marketsDelta.MarketName;
              price = marketsDelta.Ask;

              allExchangesProperty ? this.updateExhangeData(tradingPairs, pair, price, exchange, callback): callback({exchange, pair, price}  );
            });

          });
        }
      });
    } catch(error) {
      console.log('Error connecting to bittrex', error);
    }
  }
  subscribeToPoloniex(tradingPairs, callback, allExchangesProperty) {
    const connectionToPoloniex = new autobahn.Connection({
      url: poloniexURI,
      realm: "realm1"
    });
    const exchange = 'Poloniex';
    connectionToPoloniex.open();
    try {
      connectionToPoloniex.onopen = (session) => {
        console.log('Connection to Poloniex is open');
        // console.log('Session', session);
        session.subscribe('ticker', (data,kwargs) => {
          let pair = data[0];
          // Appropriate labels for these data are, in order: currencyPair, last, lowestAsk, highestBid, percentChange, baseVolume, quoteVolume, isFrozen, 24hrHigh, 24hrLow
          let price = data[2]
          this.updateExhangeData(tradingPairs, pair, data[2],'Poloniex', callback);
          allExchangesProperty ? this.updateExhangeData(tradingPairs, pair, price, exchange , callback): callback({exchange, pair, price});
          // socket.broadcast.emit('exchange data', this.exchangeData);
        });

      };
      connectionToPoloniex.onclose = (reason,details) => {
        console.log("Poloniex Websocket connection closed", reason, details);
      };
    } catch(error) {
      console.log('Error connecting to poloniex', error);
    }
  }
  subscribeToBitfinex(tradingPairs,callback, allExchangesProperty) {
    const exchange = 'Bitfinex'
    const BFX = require('bitfinex-api-node');
    const opts = {
      version: 2,
      transform: true
    };
    const bws = new BFX(opts).ws;
    try {
      bws.on('open', () => {
        console.log('Connection to Bitfinex is open');
        bws.subscribeTicker('LTCBTC');
        bws.subscribeTicker('ETHBTC');
        bws.subscribeTicker('DSHBTC');
      });
      bws.on('ticker', (pair, ticker) => {
        let price = ticker.ask;
        allExchangesProperty ? this.updateExhangeData(tradingPairs, pair, price, exchange, callback): callback({exchange, pair, price});
      });
    } catch(error) {
      console.log('Error connecting to bitfinex', error);
      bws.on('error', console.error);
    }


  }
  updateExhangeData(tradingPairs, pair, price, exchange, callback) {
    pair = exchange == 'Poloniex' || exchange == 'Bitfinex'?  this.standarizeTradePairs(pair, exchange) : pair;
    if (tradingPairs.includes(pair)) {
       if (!(pair in this.exchangeData)) {
         this.exchangeData[pair] = {
           'All_Prices': {}
         };
       }
       this.exchangeData[pair]['All_Prices'][exchange] = price;
       this.emitExchangeData(this.exchangeData[pair], callback);

    }
  }
  standarizeTradePairs(pair, exchange) {
    pair = pair == 'DSHBTC' ? 'BTC-DASH' : exchange == 'Poloniex' ? pair.replace('_', '-') : pair.substr(pair.length-3)+'-'+pair.substr(0,3);
    return pair;
  }
  emitExchangeData(marketPair, callback) {
    let marketPricesArray = Object.values(marketPair['All_Prices']);
    let bestPrice = Math.min(...marketPricesArray);
    Object.keys(marketPair['All_Prices']).map(exchange => {
      if (marketPair['All_Prices'][exchange] == bestPrice) {
        marketPair['Best_Price'] = {
        'Exchange': exchange,
        'Price': bestPrice}
      }
    });
    console.log('Exchange data', this.exchangeData);
    callback(this.exchangeData);
  }
}
