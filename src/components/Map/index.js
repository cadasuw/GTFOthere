import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
 static defaultProps = {
   zoom: 13
   };

 render() {
  console.log("in index.js: ", this.props.center)
   return (
     // Important! Always set the container height explicitly
     <div style={{ height: '100vh', width: '100%' }}>
       <GoogleMapReact
         bootstrapURLKeys={{ key: "AIzaSyAn5O0hUEyAV1CHW5-x0nNorupO5Mr-_JM"}}
         defaultCenter={this.props.center}
         defaultZoom={this.props.zoom}
       >
         { <AnyReactComponent
           lat={this.props.center.lat}
           lng={this.props.center.lng}
           text="Trailhead"
         /> }
       </GoogleMapReact>
     </div>
   );
 }
}

export default SimpleMap;