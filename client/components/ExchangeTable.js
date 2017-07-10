import React from 'react'
import {ListGroup, ListGroupItem} from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
const textGlow={
  textShadow: "#6AD8C9 0 0 10px"
}

const typing = {
  fontSize: '14px',
  fontStyle: 'italic',
  opacity: '.5'
}
let bittrexData = {};
let poloniexData = {};
let bitfinexData = {};
let exchangeData = [];
const ExchangeTable = (props) => {
  //transform the data so it fits the table format
  //check vs object.keys
  for ( let tradingPair in props.exchangeData) {
    if (Object.keys(props.exchangeData[tradingPair]).length > 2) {
      bittrexData[tradingPair] = props.exchangeData[tradingPair]['Bittrex'];
      poloniexData[tradingPair] = props.exchangeData[tradingPair]['Poloniex'];
      bitfinexData[tradingPair] = props.exchangeData[tradingPair]['Bitfinex'];
      Object.assign(bittrexData, bittrexData, {'exchange': 'Bittrex'});
      Object.assign(poloniexData, poloniexData, {'exchange': 'Poloniex'});
      Object.assign(bitfinexData, bitfinexData, {'exchange': 'Bitfinex'});
      // console.log('Bittrex data', bittrexData);
      // console.log('Poloniex data', poloniexData);
      exchangeData = [bittrexData, poloniexData,bitfinexData];
    } else {
      // console.log('Waiting for data from both exchanges to arrive...');
    }
  }

  return (
    <div>
      <h2>Exchange Data</h2>
      <BootstrapTable data={exchangeData} striped={true} hover={true}  tableStyle={ { height: '250px' } }>
        <TableHeaderColumn width='150' dataField="exchange" isKey={true} dataAlign="center" dataSort={true}>Exchanges</TableHeaderColumn>
        <TableHeaderColumn width='150' dataField="BTC-LTC" dataSort={true}>BTC-LTC</TableHeaderColumn>
        <TableHeaderColumn width='150' dataField="BTC-DASH" dataSort={true}>BTC-DASH</TableHeaderColumn>
        <TableHeaderColumn width='150' dataField="BTC-ETH" dataSort={true}>BTC-ETH</TableHeaderColumn>
      </BootstrapTable>
    </div>
  )
}

export default ExchangeTable;
