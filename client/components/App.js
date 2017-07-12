import React from 'react';
import Header from './common/Header';
import Footer from './common/Footer';
import socketIOClient from 'socket.io-client';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}
