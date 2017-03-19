import React, { Component } from 'react';
import logo from '../public/logo.png';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './Home';
import Create from './Create';
import Join from './Join';
import Wall from './Wall';

import {
    SocketProvider,
    socketConnect,
} from 'socket.io-react';
import io from 'socket.io-client';
window.socket = io.connect();
//socket.on('message', msg => console.log(msg));
//socket.emit('message', {'msg': "hello world"});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageId: 'home'
        };
        this._onItemSelect = this._onItemSelect.bind(this);
    }

    _onItemSelect(itemId){
        this.setState({pageId: itemId});
    }

  render() {
    return (
        <MuiThemeProvider>
          <div className="container">
            {this.state.pageId == 'home' ? <Home onItemSelect={this._onItemSelect} /> : ''}
            {this.state.pageId == 'join' ? <Join onItemSelect={this._onItemSelect} /> : ''}
            {this.state.pageId == 'create' ? <Create onItemSelect={this._onItemSelect} /> : ''}
            {this.state.pageId == 'wall' ? <Wall onItemSelect={this._onItemSelect} /> : ''}
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
