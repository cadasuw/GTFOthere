import React from "react";
import Geocode from "react-geocode";




class Search extends Component {
    state = {
        address: "",
        lat: "",
        lon: "",
        trails: []
    };

    

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
        return(
            <div></div>
        )
    }
}

export default Search;