import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Geocode from "react-geocode";
import axios from "axios";
import Search from "./components/search.js";


//const TRAIL_API_KEY = process.env.REACT_APP_TRAILS_KEY;
//const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_KEY;


//Geocode.setApiKey(GOOGLE_API_KEY);

class App extends Component {


  //componentDidMount() {
/*
    Geocode.fromAddress("Seattle Washington").then(
        res => {
            const { lat, lng } = res.results[0].geometry.location;
            console.log(lat, lng);
            axios.get("https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon="+ lng + "&maxDistance=50&maxResults=100&sort=distance&key=" + TRAIL_API_KEY)
            .then((response => 
              console.log(response.data.trails)
            ));
        },
        error => {
            console.error(error);
        }
    );
    */
//}

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
        <Search></Search>
      </div>
    );
  }
}

export default App;
