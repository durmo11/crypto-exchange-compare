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
let BestPriceTableData = [{
    'title': "Best Price",
  },
  {
    'title': 'Exchange'
  },
  { 'title': 'Trade Bitcoin',
  'BTC-DASH': 20,
  'BTC-ETH': 20,
  'BTC-LTC': 20
  },
  {
    'title': 'Total',
  }
];

const BestPriceTable = (props) => {
    for ( let tradingPair in props.exchangeData) {
      if (Object.keys(props.exchangeData[tradingPair]).length > 2) {
      let bestPrice = props.exchangeData[tradingPair]['Best_Rate']['Price'];
      BestPriceTableData[0][tradingPair] = props.exchangeData[tradingPair]['Best_Rate']['Price'];
      BestPriceTableData[1][tradingPair] = props.exchangeData[tradingPair]['Best_Rate']['Exchange'];
      BestPriceTableData[3][tradingPair] = 20*1/bestPrice;
      }
    }
  return (
     <div>
       <h2>Best Price Table</h2>
       <BootstrapTable data={BestPriceTableData} striped={true} hover={true} tableStyle={ { height: '250px' }}>

         <TableHeaderColumn width='150' dataField="title" isKey={true} dataAlign="center">Buy</TableHeaderColumn>
         <TableHeaderColumn width='150' dataField="BTC-LTC" dataAlign="center">LTC</TableHeaderColumn>

       </BootstrapTable>
       <BootstrapTable data={BestPriceTableData} striped={true} hover={true} tableStyle={ { height: '250px' }}>
         <TableHeaderColumn width='150' dataField="title" isKey={true} dataAlign="center">Buy</TableHeaderColumn>
         <TableHeaderColumn width='150' dataField="BTC-DASH" dataAlign="center">DASH</TableHeaderColumn>

       </BootstrapTable>
       <BootstrapTable data={BestPriceTableData} striped={true} hover={true} tableStyle={ { height: '250px' }}>
         <TableHeaderColumn width='150' dataField="title" isKey={true} dataAlign="center">Buy</TableHeaderColumn>
         <TableHeaderColumn width='150' dataField="BTC-ETH" dataAlign="center">ETH</TableHeaderColumn>

       </BootstrapTable>
     </div>
  )

}

export default BestPriceTable;
