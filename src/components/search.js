import React from "react";
import Geocode from "react-geocode";


Geocode.setApiKey("AIzaSyAn5O0hUEyAV1CHW5-x0nNorupO5Mr-_JM");

class Search extends Component {
    state = {
        address: "",
        lat: "",
        lon: "",
        trails: []
    };

    

    componentDidMount() {
        const script = document.createElement("script");

        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAn5O0hUEyAV1CHW5-x0nNorupO5Mr-_JM";
        script.async = true;
        script.defer = true;

        document.head.appendChild(script);

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