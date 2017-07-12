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
let exchangeData = [{}, {}, {}];
function columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
  // fieldValue is column value
  // row is whole row object
  // rowIdx is index of row
  // colIdx is index of column
  // console.log(fieldValue)
  console.log(row);
  delete row.exchange;
  let rowValues = Object.values(row);
  console.log('Row Values', rowValues);
  console.log('Min',Math.min(...rowValues));
  console.log('Field Value', fieldValue);
  return fieldValue == Math.min(...rowValues) ? 'td-column-function-even-example' : 'td-column-function-odd-example';
}
const ExchangeTable = (props) => {
  //transform the data so it fits the table format
  //check vs object.keys
  if (props.exchangeData != undefined && Object.keys(props.exchangeData).length) {
    Object.keys(props.exchangeData).map((tradingPair)=> {
      Object.keys(props.exchangeData[tradingPair]['All_Prices']).map((exchange,index) => {
        Object.assign(exchangeData[index], {exchange})
        exchangeData[index][tradingPair] = props.exchangeData[tradingPair]['All_Prices'][exchange]
      });
    });
  } else {
    console.log('Exchange data arriving', props.exchangeData)
  }

  return (
    <div className="exchangeTable">
      <h2>Exchange Data</h2>
      <BootstrapTable data={exchangeData} striped={true} hover={true}  tableStyle={ { height: '250px' } }>
        <TableHeaderColumn width='150' dataField="exchange" isKey={true} dataAlign="center" dataSort={true}>Exchanges</TableHeaderColumn>
        <TableHeaderColumn width='150' dataField="BTC-LTC" dataSort={true} columnClassName={ columnClassNameFormat }>Bittrex</TableHeaderColumn>
        <TableHeaderColumn width='150' dataField="BTC-DASH" dataSort={true}>Poloniex</TableHeaderColumn>
        <TableHeaderColumn width='150' dataField="BTC-ETH" dataSort={true}>BTC-ETH</TableHeaderColumn>
      </BootstrapTable>
    </div>
  )
}

export default ExchangeTable;
