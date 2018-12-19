import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/vi';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

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

function isSearched(searchTerm){
  return function(item) {
    return !searchTerm || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      list: list,
      searchTerm: '',
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onSearchChange(event){
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id){
    function isNotId(item){
      return item.objectID !== id;
    }

    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list:updatedList });
  }  

  render() {
    const { searchTerm, list} = this.state;  //destructuring
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value = {searchTerm}
            onChange = {this.onSearchChange}
          >
            Search 
          </Search>
        </div>
          <Table 
            list={list}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
          />        
      </div>      
    );
  }
}

function Search({ value, onChange, children }) {
  return(
    <form>
      {children}< input 
        type="text" 
        value={value} 
        onChange={onChange} />
    </form>
  );  
}

function Table ({ list, pattern, onDismiss }){
  const largeColumn = {
    width: '40%',
  };

  const midColumn = {
    width: '30%',
  };

  const smallColumn = {
    width: '10%',
  };

  return(
    <div className="table">
      {
        list.filter(isSearched(pattern))
        .map( item =>             
            <div key={item.objectID} className="table-row">
              <span style={midColumn}>
                <a href={item.url}>{item.title}</a>
              </span>
              <span style={{width: '30%'}}>{item.author}</span>
              <span style={smallColumn}>{item.num_comments}</span>
              <span style={smallColumn}>{item.points}</span>
              <span style={midColumn}>
                <Button onClick={ () => onDismiss(item.objectID)} className="button-inline">
                  Dismiss
                </Button>
              </span>
            </div>
        )}
    </div>
  );  
}

function Button ({
  onClick,
  className = '',
  children
}){
  return (
    <button
      onClick = {onClick}
      className = {className}
      type = "button"
    >
      {children}
    </button>
  );  
}

export default App;
