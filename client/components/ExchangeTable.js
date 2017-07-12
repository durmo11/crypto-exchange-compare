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
let localExchangeData;
let exchangeData = [{}, {}, {}];
//TODO need to make this scalable
//convert to smart components
const ExchangeTable = (props) => {
  //transform the data so it fits the table format
  //check vs object.keys
  if (props.exchangeData != undefined && Object.keys(props.exchangeData).length) {
    localExchangeData = props.exchangeData;
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
      <p>Green highlights the best price</p>
      <BootstrapTable data={exchangeData} striped={true} hover={true}  tableStyle={ { height: '250px' } }>
        <TableHeaderColumn width='150' dataField="exchange" isKey={true} dataAlign="center" dataSort={true}>Exchanges</TableHeaderColumn>
        <TableHeaderColumn width='150' dataField="BTC-LTC" dataSort={true} columnClassName={ columnClassNameFormat }>BTC-LTC</TableHeaderColumn>
        <TableHeaderColumn width='150' dataField="BTC-DASH" dataSort={true} columnClassName={ columnClassNameFormat }>BTC-DASH</TableHeaderColumn>
        <TableHeaderColumn width='150' dataField="BTC-ETH" dataSort={true} columnClassName={ columnClassNameFormat }>BTC-ETH</TableHeaderColumn>
      </BootstrapTable>
    </div>
  )
}

function columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
  // fieldValue is column value
  // row is whole row object
  // rowIdx is index of row
  // colIdx is index of column
  // console.log(fieldValue)
  let columnValues;
  if (localExchangeData) {
    if (colIdx === 1) {
      columnValues = Object.values(localExchangeData['BTC-LTC']['All_Prices']);
    } else if (colIdx === 2 ) {
      columnValues = Object.values(localExchangeData['BTC-DASH']['All_Prices']);
    } else {
      columnValues = Object.values(localExchangeData['BTC-ETH']['All_Prices']);
    }
    // console.log('Column Values', columnValues);
    // console.log('Min',Math.min(...columnValues));
    // console.log('Field Value', fieldValue);
    return fieldValue == Math.min(...columnValues) ? 'td-column-function-best-price' : 'td-column-function-not-best';
  }


}
export default ExchangeTable;
