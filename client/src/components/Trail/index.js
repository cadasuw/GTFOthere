import React from "react";
import "./style.css";



function Trail({ name, num, summary, location, length, image, onClick, latitude, longitude }) {

const lat = latitude;
const lng = longitude;

    return (
        <div className="container">
            <div className="row">

                <div className="column" id = "image">
                    <img src={image} alt="Sorry!  Could not find a picture!"></img>
                </div>

                <div className="column" id="result" onClick={onClick}>
                    <p>{num + 1}</p>
                    <p>Trail Name: {name}</p>
                    <p>Trail Summary: {summary}</p>
                    <p>Trail Location: {location}</p>
                    <p>Trail Length: {length} Miles</p>
                </div>

               {/*  <div className="column" id="buttons">
                    <SaveBtn></SaveBtn>
                </div> */}

            </div>
        </div>

    );
}

export default Trail;