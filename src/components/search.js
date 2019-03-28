import React, {Component} from "react";
import Geocode from "react-geocode";

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


    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            address: event.target.value
        });
        console.log(this.state.address);
    };

handleFormSubmit = event => {

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