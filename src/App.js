import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyAn5O0hUEyAV1CHW5-x0nNorupO5Mr-_JM");

class App extends Component {


  componentDidMount() {

    Geocode.fromAddress("Seattle Washington").then(
        res => {
            const { lat, lng } = res.results[0].geometry.location;
            console.log(lat, lng);
        },
        error => {
            console.error(error);
        }
    );
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
