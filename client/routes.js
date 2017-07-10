import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/HomePage';
import TradeTable from './components/TradeTable';
import ExchangeTable from './components/ExchangeTable';
import BestPriceTable from './components/BestPriceTable';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/trade" component={TradeTable} />
    <Route path="exchange" component={ExchangeTable} />
    <Route path="/buy" component={BestPriceTable} />
  </Route>
);
