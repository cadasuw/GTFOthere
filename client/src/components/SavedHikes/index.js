import React, { Component } from "react";
import "./style.css";
import HikeItem from "../HikeItem";

import axios from "axios";


class SavedHikes extends Component {

    state = {
        hikes:[]
    }
    componentDidMount() {
        this.loadHikes();
      }

      loadHikes = () =>{
          axios.get("http://localhost:3000/api/hikes")
          .then(res => this.setState({ hikes: res.data })) 
          .catch(err => console.log(err)); 
      }

      render(){
          return <div>
              <h1>My Saved Trails</h1>
              <h3><a href="http://localhost:3000">Home Page</a></h3>
            <table id="hikes">
          <th>Name of Trail</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Description of Trail</th>
          <th>Location</th>
          <th>Length</th>
          <th>Image</th>
          {this.state.hikes.map(x => <HikeItem hikeInfo={x} />  )}</table></div>; 
      }
}

export default SavedHikes; 