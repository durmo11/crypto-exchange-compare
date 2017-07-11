# Crypto Exchange Compare

Express and Socket.io app powered by React+ Redux to implement real-time tracking of specified trading pairs such as (BTC-DASH, BTC-ETH, BTC-LTC) from Bittrex, Poloniex and Bitfinex

* install dependencies
```yarn install```
* install ``rimraf`` globally for use in production build
```yarn global add rimraf```
* run in dev
```yarn run open:src```
* build for prod
``` yarn run build```

* open the app at ```http://localhost:3000```

## API
```
import ExchangeSocketApi from './api/exchangeSocketApi';
const exchangeSocketApi = new ExchangeSocketApi();

* specify trading pairs as an array
```
tradingPairs = ['BTC-ETH','BTC-DASH', 'BTC-LTC']

```
```
### exchangeSocketApi.listenDataFromExchange(tradingPairs, callback)


Get realtime data from exchanges. Currently supports Poloniex, Bittrex and Bitfinex
```
exchangeSocketApi.listenDataFromExchanges(tradingPairs, (data) => {
  console.log('All Exchange data', data);
});
//returns
{
  'BTC-LTC': {
    Bitfinex: 0.018955,
    Bittrex: 0.01895222,
    Poloniex: '0.01893073',
    Best_Rate: { Exchange: 'Poloniex', Price: 0.01893073 }
  },
  'BTC-ETH':{
    Bitfinex: 0.081817,
    Bittrex: 0.0822603,
    Poloniex: '0.08176915',
    Best_Rate: { Exchange: 'Poloniex', Price: 0.08176915 }
  },
  'BTC-DASH':{
    Bitfinex: 0.069946,
    Bittrex: 0.06990888,
    Poloniex: '0.06973162',
    Best_Rate: { Exchange: 'Poloniex', Price: 0.06973162 }
   }
}
```
### exchangeSocketApi.subscribeToBitfinex(tradingPairs, callback)

Subscribe To Bitfinex
```
exchangeSocketApi.subscribeToBitfinex(tradingPairs, (data) => {
  console.log('Bitfinex data', data);
});
//returns
{ exchange: 'Bitfinex', pair: 'LTCBTC', price: 0.018952 }
```
### exchangeSocketApi.subscribeToPoloniex(tradingPairs, callback)

Subscribe To Poloniex
```
exchangeSocketApi.subscribeToPoloniex(tradingPairs, (data) => {
  console.log('Poloniex data', data);
});
//returns
{ exchange: 'Poloniex', pair: 'LTCBTC', price: 0.018952 }
```
### exchangeSocketApi.subscribeToBittrex(tradingPairs, callback)

Subscribe To Bittrex
```
exchangeSocketApi.subscribeToBittrex(tradingPairs, (data) => {
  console.log('Bittrex data', data);
});
//returns
{ exchange: 'Bittrex', pair: 'LTCBTC', price: 0.018952 }
```
## TODO
* fetch user from database(mongodb)
* store historical data to db and use d3 to display it
* spinner until data arrives from all 3 exchanges
