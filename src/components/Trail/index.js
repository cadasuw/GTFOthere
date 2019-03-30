import React from "react";
import "./style.css";


function Trail({name, summary, location, image }) {
    return (
        <div className = "result">
        
        <p>Trail Name: {name}</p>
        <p>Trail Summary: {summary}</p>
        <p>Trail Location: {location}</p>
        <img src = {image} alt = "Trail"></img>
        
        </div>
    );
}

export default Trail;