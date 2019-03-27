import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Geocode from "react-geocode";
import axios from "axios";

Geocode.setApiKey("AIzaSyAn5O0hUEyAV1CHW5-x0nNorupO5Mr-_JM");

class App extends Component {


  componentDidMount() {

    Geocode.fromAddress("Seattle Washington").then(
        res => {
            const { lat, lng } = res.results[0].geometry.location;
            console.log(lat, lng);
            axios.get("https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon="+ lng + "&maxDistance=50&maxResults=100&sort=distance&key=200431883-69df4d2d08177641033f4b4a848ab12d")
            .then((response => 
              console.log(response.data.trails)
            ));
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
