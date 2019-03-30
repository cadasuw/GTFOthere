import React from "react";
import "./style.css";
import SaveBtn from "../SaveBtn";


function Trail({name, summary, location, length, image }) {
    return (
        <div className = "result">
        
        <p>Trail Name: {name}</p>
        <p>Trail Summary: {summary}</p>
        <p>Trail Location: {location}</p>
        <p>Trail Length: {length} Miles</p>
        <img src = {image} alt = "Trail"></img>
        <p>
        <SaveBtn></SaveBtn>
        </p>
        </div>
    );
}

export default Trail;