import React from 'react'
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import socketIOClient from 'socket.io-client';
import {bindActionCreators} from 'redux';
import ExchangeTable from './ExchangeTable';
import * as userActions from '../actions/userActions.js';
import TradeTable from './TradeTable';
import BestPriceTable from './BestPriceTable';
class HomePage extends React.Component {
  constructor(props) {
    const socket = socketIOClient();
    super(props)
    this.state = {
      exchangeData: {},
      // poloniexData: {}
    }
    socket.on('exchange data', (exchangData) => this.showExchangeData(exchangData))
    // socket.on('data arrived from poloniex', (poloniexData) => this.showPoloniexData(poloniexData))
  }
  componentDidMount() {
    // this.setState({user: this.props.actions.getUser()})
  }

  showExchangeData(exchangeData) {
    this.setState({exchangeData: exchangeData});
  }
  render() {
    return (
      <div>
        <ExchangeTable exchangeData= {this.state.exchangeData}/>
        <TradeTable exchangeData= {this.state.exchangeData}/>
        <BestPriceTable exchangeData= {this.state.exchangeData}/>

      </div>
    )
  }
}
function mapStateToProps(state) {
  return {user: state.user, exchangeData: state.exchangeData}
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(Object.assign(userActions), dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
