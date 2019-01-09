import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
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
      result: null,
      searchTerm: DEFAULT_QUERY,
    };

    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  setSearchTopstories(result){
    this.setState({ result });
  }

  fetchSearchTopstories(searchTerm){
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
    .then(response => response.json())
    .then(result => this.setSearchTopstories(result));
  }

  componentDidMount(){
    const { searchTerm } = this.state;
    this.fetchSearchTopstories(searchTerm);
  }

  onSearchChange(event){
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id){
    function isNotId(item){
      return item.objectID !== id;
    }

    const updatedHits = this.state.result.hits.filter(isNotId);
    const updatedResult = Object.assign({}, this.state.result, updatedHits);
    this.setState({ 
      result: { ...this.state.result, hits: updatedHits }
     });
  }  

  render() {
    const { searchTerm, result} = this.state;  //destructuring

    console.log(this.state);
    
    if(!result){
      return null;
    }
    
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
            list={result.hits}
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
