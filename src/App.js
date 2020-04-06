import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import DataChart from './components/dataChart';
import CountrywiseBarChart from './components/countrywisebarchart';
import Footer from './components/footer';

class App extends Component {
  
  render(){
    return (
      <div className="App">
        <Header />
        <DataChart />
        <CountrywiseBarChart />
        <Footer />
      </div>

      )
  }
}

export default App;
