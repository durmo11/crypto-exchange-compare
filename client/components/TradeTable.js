import React from 'react'
import {ListGroup, ListGroupItem} from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../css/main.css';
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
let exchangeData = [];
let bitfinexData = {};
let bittrexPoloniexDifferenceData = {};
let bittrexBitfinexDifferenceData = {};
const TradeTable = (props) => {
  //transform the data so it fits the table format
  //check vs object.keys
  for ( let tradingPair in props.exchangeData) {
    if (Object.keys(props.exchangeData[tradingPair]).length > 2) {
      bittrexData[tradingPair] = 20*1/props.exchangeData[tradingPair]['Bittrex'];
      poloniexData[tradingPair] = 20*1/props.exchangeData[tradingPair]['Poloniex'];
      bitfinexData[tradingPair] = 20*1/props.exchangeData[tradingPair]['Bitfinex'];
      Object.assign(bittrexData, bittrexData, {'title': 'Bittrex'});
      Object.assign(poloniexData, poloniexData, {'title': 'Poloniex'});
      Object.assign(bitfinexData, bitfinexData, {'title': 'Bitfinex'});

      // console.log('Bittrex data', bittrexData);
      // console.log('Poloniex data', poloniexData);
      exchangeData = [bittrexData, poloniexData, bitfinexData];
      bittrexPoloniexDifferenceData['title'] = 'Bittrex/Poloniex';
      let bittrexPoloniexDifference = bittrexData[tradingPair] -  poloniexData[tradingPair];
      bittrexPoloniexDifferenceData[tradingPair] = bittrexPoloniexDifference;
      // console.log('Difference Data', differenceData);
      exchangeData.push(bittrexPoloniexDifferenceData);
      bittrexBitfinexDifferenceData['title'] = 'Bittrex/Bitfinex';
      let bittrexBitfinexDifference = bittrexData[tradingPair] -  bitfinexData[tradingPair];
      bittrexBitfinexDifferenceData[tradingPair] = bittrexBitfinexDifference;
      // console.log('Difference Data', differenceData);
      exchangeData.push(bittrexBitfinexDifferenceData);
      // console.log('Exchange Data', exchangeData);
    } else {
      // console.log('Waiting for data from both exchanges to arrive...');
    }
  }

  return (
    <div>
      <h2>Trading Table for 20 BTC</h2>
      <BootstrapTable data={exchangeData} striped={true} hover={true}  tableStyle={ { height: '250px' } }>
        <TableHeaderColumn width='150' columnClassName="row-bottom-padded-md" dataField="title" isKey={true} dataAlign="center"></TableHeaderColumn>
        <TableHeaderColumn width='150' dataField="BTC-LTC" dataSort={true}>BTC-LTC</TableHeaderColumn>
        <TableHeaderColumn width='150' dataField="BTC-DASH" dataSort={true}>BTC-DASH</TableHeaderColumn>
        <TableHeaderColumn width='150' dataField="BTC-ETH" dataSort={true}>BTC-ETH</TableHeaderColumn>
      </BootstrapTable>
    </div>
  )
}

export default TradeTable;
