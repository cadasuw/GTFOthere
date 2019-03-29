import React, {Component} from "react";
import Geocode from "react-geocode";
import axios from "axios";

const TRAIL_API_KEY = process.env.REACT_APP_TRAILS_KEY;
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_KEY;


Geocode.setApiKey(GOOGLE_API_KEY);



class Search extends Component {
    state = {
        address: "Seattle Washington",
        lat: "",
        lon: "",
        trails: []
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
    Geocode.fromAddress(this.state.address).then(
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
        return(
            <div>
                <form id = "searching">
                    <label for = "place">Pick a place to hike around!</label>
                    <input id="place" onChange = {this.handleInputChange}>
                    </input>
                    <button onClick={this.handleFormSubmit}>Get Out There!!!</button>
                </form>
            </div>
        )
    }
}

export default Search;