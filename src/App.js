import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './Home';
import Create from './Create';
import Join from './Join';

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
            <header>
                <svg viewBox="0 0 24 24">
                    <path fill="rgba(0,0,0,0.6)" d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z" />
                </svg>
                Lecture Buddy
            </header>
            {this.state.pageId == 'home' ? <Home onItemSelect={this._onItemSelect} /> : ''}
            {this.state.pageId == 'join' ? <Join onItemSelect={this._onItemSelect} /> : ''}
            {this.state.pageId == 'create' ? <Create onItemSelect={this._onItemSelect} /> : ''}
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
