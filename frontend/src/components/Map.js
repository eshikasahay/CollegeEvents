import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

// type State = {
//     lat: Number,
//     lng: Number,
//     zoom: Number,
// }
// const position = [51.505, -0.09]

export class SimpleExample extends Component{
    state = {
        lat: 28.6024274,
        lng: -81.2000599,
        zoom: 13,
    };

    

    render() {
        
        return (
            <MapContainer center={{
                lat: this.state.lat,
                lng: this.state.lng
            }
            } zoom={13} scrollWheelZoom={false}>
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <Marker position={position}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker> */}
            </MapContainer>
        )
    }
}
  
export default SimpleExample;