import React, { Component } from "react";
import Geocode from "react-geocode";
import axios from "axios";
import Trail from "./Trail";

const TRAIL_API_KEY = process.env.REACT_APP_TRAILS_KEY;
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_KEY;


Geocode.setApiKey(GOOGLE_API_KEY);



class Search extends Component {
    state = {
        address: "Seattle Washington",
        latt: "",
        long: "",
        trailResults: []
    };

    componentDidMount = () => {

    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            address: event.target.value
        });
        console.log(this.state.address);
    };

    handleFormSubmit = event => {
        event.preventDefault();
        console.log(this.state.address);
        Geocode.fromAddress(this.state.address)
            .then(
                res => {
                    const { lat, lng } = res.results[0].geometry.location;
                    console.log(lat, lng);
                    this.setState({
                        latt: lat,
                        long: lng
                    });
                    this.findTrails();
                },


                error => {
                    console.error(error);
                }
            );
    }

    findTrails = () => {
        axios.get("https://www.hikingproject.com/data/get-trails?lat=" + this.state.latt + "&lon=" + this.state.long + "&maxDistance=50&maxResults=10&sort=distance&key=" + TRAIL_API_KEY)
            //.then(res => res.json())
            .then(
                (response => {
                console.log(response.data.trails[0]);
                //console.log(response.data.json());
                const getThem = [];
                for(var i = 0; i < response.data.trails.length; i++){
                    getThem.push(
                        <Trail
                        key = {i}
                        name = {response.data.trails[i].name}
                        summary={response.data.trails[i].summary}
                        location={response.data.trails[i].location}
                        length={response.data.trails[i].length}
                        image= {response.data.trails[i].imgSmall}
                        ></Trail>
                        )
                }
                console.log(getThem);
                this.setState({
                    trailResults: getThem
                });
                console.log(this.state.trailResults);
            }
                )
            )
            .catch(function(err){
                console.log(err)
            })
            /*    results => results.json()
            ).then(
                data => {
                    this.setState({ trailResults: data.results})
                }
            )*/
    };

    showTrails = () => {

    }
    /*

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
*/
    render() {
        return (
            <div>
                <form id="searching">
                    <label for="place">Pick a place to hike around!</label>
                    <input id="place" onChange={this.handleInputChange}>
                    </input>
                    <button onClick={this.handleFormSubmit}>Get Out There!!!</button>
                </form>
  
                <div>
                    {this.state.trailResults}
                </div>
            </div>

        )
    }
}

export default Search;