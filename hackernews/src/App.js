import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];
class App extends Component {
  render() {
    const hellowWorld = "Welcome to React jugando con HMR";
    return (
      <div className="App">
        <h2>{hellowWorld}</h2>
      </div>
    );
  }
}

export default App;
