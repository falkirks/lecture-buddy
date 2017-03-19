import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
    SocketProvider,
    socketConnect,
} from 'socket.io-react';
import io from 'socket.io-client';
const socket = io.connect();
socket.on('message', msg => console.log(msg));
socket.emit('message', {'msg': "hello world"});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttons: [],
        };
    }

    componentDidMount() {
        this.setState({buttons: socket.labels}) //TODO: button names
    }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>


          <div>
              <ul className="list-group">
                  {this.state.buttons.map((btn) => (
                      <li> < Click name={btn} /> </li>
                  ))}
              </ul>
          </div>
      </div>
    );
  }
}

export default App;
