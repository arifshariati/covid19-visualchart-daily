import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import DataChart from './components/dataChart';

class App extends Component {
  
  render(){
    return (
      <div className="App">
        <Header />
        <DataChart />
      </div>

      )
  }
}

export default App;
