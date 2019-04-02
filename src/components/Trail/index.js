import React from "react";
import "./style.css";
import SaveBtn from "../SaveBtn";



function Trail({ name, num, summary, location, length, image, onClick, latitude, longitude }) {

const lat = latitude;
const lng = longitude;

    return (
        <div className="container" onClick = {onClick}>
            <div className="row">

                <div className="column" id = "image">
                    <img src={image} alt="Sorry!  Could not find a picture!"></img>
                </div>

                <div className="column" id="result">
                    <p>{num + 1}</p>
                    <p>Trail Name: {name}</p>
                    <p>Trail Summary: {summary}</p>
                    <p>Trail Location: {location}</p>
                    <p>Trail Length: {length} Miles</p>
                    <p>Lat and Lon: {latitude} and {longitude}</p>
                </div>

                <div className="column" id="buttons">
                    <SaveBtn></SaveBtn>
                </div>

            </div>
        </div>

    );
}

export default Trail;