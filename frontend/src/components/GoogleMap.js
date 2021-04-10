import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import CurrentLocation from '../components/Map.js';

export class MapContainer extends Component {
    state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      // mapCenter: {
      //     lat: 28.6024274,
      //     lng: -81.2000599
      // }
    };
    // containerStyle = {
    //   position: 'absolute',  
    //   width: '50%',
    //   height: '50%'
    // }
   
    onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
   
    onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        })
      }
    };
   
    render() {
      return (
        <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >
        <Marker onClick={this.onMarkerClick} name={'Current Location'} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </CurrentLocation>
        // <Map google={this.props.google}
        //     onClick={this.onMapClicked}
        //     containerStyle={this.containerStyle}
        //     initialCenter={{
        //         lat: this.state.mapCenter.lat,
        //         lng: this.state.mapCenter.lng
        //     }

        //     }>
        //   <Marker onClick={this.onMarkerClick}
        //           name={'Current location'} />
   
        // </Map>
      )
    }
  }

  // export default GoogleApiWrapper({
  //   apiKey: ('AIzaSyDwlJs2oiRdCwCujioOxWAaN9XGrYsHVK4')
  // })(MapContainer)

  export default GoogleApiWrapper(
    (props) => ({
      apiKey: ('AIzaSyDwlJs2oiRdCwCujioOxWAaN9XGrYsHVK4')
    }
  ))(MapContainer)