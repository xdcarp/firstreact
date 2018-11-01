import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    var hellowWorld = "Welcome to React";
    return (
      <div className="App">
        <h2>{hellowWorld}</h2>
      </div>
    );
  }
}

export default App;
