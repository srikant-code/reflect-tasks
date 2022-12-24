// To integrate Azure Maps with a new React component, you will need to follow these steps:

// Sign up for an Azure Maps account and create a new Azure Maps resource in the Azure portal.

// Once the Azure Maps resource has been created, navigate to the "Keys" section of the resource and copy one of the primary or secondary keys.

// In your React project, install the Azure Maps package by running the following command
// npm install --save @azure/maps-control

// You can then customize the map by adding additional components, such as markers or layers, as children of the Map component.

import React from "react";
import { Map, Marker } from "@azure/maps-control";

const MyMapComponent = () => {
  return (
    <div>
      <Map
        ref={(map) => {
          this.map = map;
        }}
        center={[-122.33, 47.6]}
        zoom={12}
        style="height:400px; width:400px"
        mapType="road"
        key={yourAzureMapsKey}
        className="my-map"
      >
        <Marker position={[-122.33, 47.6]} />
      </Map>
      <button onClick={() => this.map.zoomIn()}>Zoom In</button>
      <button onClick={() => this.map.zoomOut()}>Zoom Out</button>
      <button onClick={() => this.map.pan([-122.33, 47.6])}>Pan Map</button>
    </div>
  );
};

export default MyMapComponent;

// in css
// .my-map {
//   border: 1px solid black;
// }
