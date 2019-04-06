import React, { Component } from "react";
import Geocode from "react-geocode";
import axios from "axios";
import Trail from "./Trail";
import "./style.css";
import Map from "./Map";
import Modal from "./Modal";

//const TRAIL_API_KEY = process.env.REACT_APP_TRAILS_KEY;
//const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_KEY;
const TRAIL_API_KEY = "200431883-69df4d2d08177641033f4b4a848ab12d";
const GOOGLE_API_KEY = "AIzaSyAn5O0hUEyAV1CHW5-x0nNorupO5Mr-_JM";

Geocode.setApiKey(GOOGLE_API_KEY);



class Search extends Component {

    state = {
        address: "Seattle Washington",
        latt: "",
        long: "",
        trailResults: [],
        center: {
            lat: "",
            lng: ""
        },
        isOpen: false
    };

    handleInputChange = event => {
        event.preventDefault();
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
    renderMap = (trailLat, trailLng) => {
        console.log(trailLat + "      " + trailLng);

        this.setState({
            center: {
                lat: trailLat,
                lng: trailLng
            }
        });

        this.toggleModal();
    }

    toggleModal = () => {
        console.log("in Toggle Modal: ", this.state.isOpen);
        this.setState({
            isOpen: !this.state.isOpen
            //  isOpen: true
        });
        console.log("out Toggle Modal: ", this.state.isOpen);
    }


    findTrails = () => {
        axios.get("https://www.hikingproject.com/data/get-trails?lat=" + this.state.latt + "&lon=" + this.state.long + "&maxDistance=50&maxResults=100&sort=distance&key=" + TRAIL_API_KEY)

            .then(
                (response => {
                    console.log(response.data.trails[0]);
                    const getThem = [];
                    for (var i = 0; i < response.data.trails.length; i++) {
                        getThem.push(
                            {
                                key: i,
                                name: response.data.trails[i].name,
                                num: i,
                                summary: response.data.trails[i].summary,
                                location: response.data.trails[i].location,
                                length: response.data.trails[i].length,
                                image: response.data.trails[i].imgSmall,

                                latitude: response.data.trails[i].latitude,
                                longitude: response.data.trails[i].longitude,


                            }
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
            .catch(function (err) {
                console.log(err)
            })

    };


    render() {
        return (
            <div>
                <form id="searching">
                    {/*} <label for="place">Pick a place to hike around!</label>
                    <input id="place" placeholder="GET THE FEET OUT!!!!" onChange={this.handleInputChange}>
        </input>*/}
                    <p className={"air-up"}>
                       {/*} <button id={"button1-container"} className={"button1 button-primary-orange-hollow"}>*/}
                            <input className={"button"} placeholder={"Get The Feet Out!"} onChange={this.handleInputChange} />

                        {/*</button>*/}
                    </p>
                    <p>
                        <button onClick={this.handleFormSubmit}>Go</button>
                    </p>
                </form>

                <div id="trailList">
                    {this.state.trailResults.map(trail => {
                        return <Trail
                            key={trail.key}
                            name={trail.name}
                            num={trail.num}
                            summary={trail.summary}
                            location={trail.location}
                            length={trail.length}
                            image={trail.image}

                            latitude={trail.latitude}
                            longitude={trail.longitude}
                            onClick={() => this.renderMap(trail.latitude, trail.longitude)}
                        //onClick={() => this.toggleModal()}  
                        />
                    })}
                    <Modal
                        showModal={this.state.isOpen}
                        center={this.state.center}
                        toggleModal={this.toggleModal}
                    />
                    {/* {this.state.center.lat 
                        ? <Map center={this.state.center}/> 
                        : <div><p>OOps!!!!!</p></div>} */}
                    {/* <button onClick={() => this.toggleModal()}>Close Modal</button> */}
                    {/* </Modal> */}
                </div>
            </div>

        )
    }
}

export default Search;