import React from 'react'
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ExchangeTable from './ExchangeTable';
import * as userActions from '../actions/userActions.js';
import CompareTable from './CompareTable';
import BestPriceTable from './BestPriceTable';
import socketIOClient from 'socket.io-client';
const socket = socketIOClient();
class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      exchangeData: {},
      // poloniexData: {}
    }
    // this.setState({user: this.props.actions.getUser()})
    socket.on('exchange data', (exchangData) => this.showExchangeData(exchangData));
  }
  componentWillMount() {

  }
  componentDidMount() {

  }

  showExchangeData(exchangeData) {
    // console.log("Show Exchange data is being called", exchangeData);
    this.setState((prevState, props) => {
      return {exchangeData}
    });
  }
  render() {
    return (
      <div>
        <ExchangeTable exchangeData= {this.state.exchangeData}/>
        <CompareTable exchangeData= {this.state.exchangeData}/>
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
