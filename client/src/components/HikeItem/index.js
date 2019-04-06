import React from "react";
import "./style.css";

function HikeItem(props) {
  return (
    <tr>
      <td>{props.hikeInfo.name}</td>
      <td>{props.hikeInfo.latitude}</td>
      <td>{props.hikeInfo.longitude}</td>
      <td>{props.hikeInfo.summary}</td>
      <td>{props.hikeInfo.location}</td>
      <td>{props.hikeInfo.length}</td>
      <td><img src={props.hikeInfo.image} /> </td>    
    </tr>
  );
}

export default HikeItem;
