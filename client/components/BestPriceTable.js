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
  'BTC-DASH': '20 BTC',
  'BTC-ETH': '20 BTC',
  'BTC-LTC': '20 BTC'
  },
  {
    'title': 'Total',
  }
];

const BestPriceTable = (props) => {
  const cellEditProp = {
    mode: 'click',
    blurToSave: true,
  };
  if (props.exchangeData != undefined && Object.keys(props.exchangeData).length) {
    Object.keys(props.exchangeData).map((tradingPair, index)=> {
      let bestPrice = props.exchangeData[tradingPair]['Best_Price']['Price'];
      BestPriceTableData[0][tradingPair] = props.exchangeData[tradingPair]['Best_Price']['Price'];
      BestPriceTableData[1][tradingPair] = props.exchangeData[tradingPair]['Best_Price']['Exchange'];
      BestPriceTableData[3][tradingPair] = 20*1/bestPrice+' '+tradingPair.split('-')[1];
    });
  }
  return (
     <div className="bestPrice">
       <h2>Best Price Table</h2>
       <BootstrapTable data={BestPriceTableData} striped={true} cellEdit={ cellEditProp } hover={true} tableStyle={ { height: '250px' }}>

         <TableHeaderColumn width='150' dataField="title" isKey={true} dataAlign="center">BUY</TableHeaderColumn>
         <TableHeaderColumn width='150' dataField="BTC-LTC"  dataAlign="center">LTC</TableHeaderColumn>

       </BootstrapTable>

       <BootstrapTable data={BestPriceTableData} striped={true} hover={true} tableStyle={ { height: '250px' }}>
         <TableHeaderColumn  dataField="title" isKey={true} dataAlign="center">BUY</TableHeaderColumn>
         <TableHeaderColumn width='150' dataField="BTC-DASH" dataAlign="center">DASH</TableHeaderColumn>

       </BootstrapTable>

       <BootstrapTable data={BestPriceTableData} striped={true} hover={true} tableStyle={ { height: '250px' }}>
         <TableHeaderColumn width='150' dataField="title" isKey={true} dataAlign="center">BUY</TableHeaderColumn>
         <TableHeaderColumn width='150' dataField="BTC-ETH" dataAlign="center">ETH</TableHeaderColumn>

       </BootstrapTable>
     </div>
  )

}

export default BestPriceTable;
