import React, { createRef } from "react";
import { render } from "react-dom";
import { Button, InputGroup, Form } from 'react-bootstrap';
import GoogleMap from "google-map-react";
import GoogleMapReact from "google-map-react";

const GOOGLE_API_KEY = "AIzaSyDwlJs2oiRdCwCujioOxWAaN9XGrYsHVK4";
var lat, lng;

class GMapReact extends React.Component {
  render() {
    const { center, zoom } = this.props;
    return (
      <div style={{ position: 'absolute', width: "60%", height: "70%" }}>
        <GoogleMap
          bootstrapURLKeys={{ key: [GOOGLE_API_KEY] }}
          center={center}
          zoom={zoom}
        />
      </div>
    );
  }
}

class MapUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.inref = createRef();
    this.state = {
      center: {
        lat: 37.7824134,
        lng: -122.4088472
      },
      form: {
        lat: 37.7824134,
        lng: -122.4088472
      }
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    
  }

//   handleChange() {
//     this.setState({
//       form: {
//         lat: Number(this.ref.lat.value),
//         lng: Number(this.ref.lng.value)
//       }
//     });
//   }

handleChange() {
    this.setState({
      form: {
        lat: Number(lat.value),
        lng: Number(lng.value)
      }
    });
  }

  onChange = e => {
    this.setState({ lat: e.target.value });
  };

  onChange2 = e => {
    this.setState({ lng: e.target.value });
  };

  handleClick() {
      console.log(this.state.form);
    this.setState({
      center: this.state.form
    });
    console.log(this.state.form);
    localStorage.setItem('location', JSON.stringify(this.state.form));
  }

 
  
  render() {
    const center = this.state.center;
    return (
      <div style={{ position: 'absolute', width: "60%", height: "70%" }}>
        <div>
        <Form>
            <Form.Group controlId="formBasicFirst">
                <Form.Control className="login-input collsize" type="fname" placeholder="Latitude" onChange={this.handleChange} ref={(c) => lat = c}/>
            </Form.Group>
            <Form.Group controlId="formBasicFirst">
                <Form.Control className="login-input collsize" type="fname" placeholder="Longitude" onChange={this.handleChange} ref={(c) => lng = c}/>
            </Form.Group>
            {/* <input onClick={this.handleClick} type="button" value="update" /> */}
            <Button variant="secondary" onClick={this.handleClick}>Update</Button>
        </Form>
          {/* <input
            // ref="lat"
            ref={this.inref}
            type="text"
            value={this.state.form.lat}
            // onChange={this.handleChange}
            onChange={this.onChange}
          />
          <input
            // ref="lng"
            ref={this.inref}
            type="text"
            value={this.state.form.lng}
            // onChange={this.handleChange}
            onChange={this.onChange2}
          />
          <input onClick={this.handleClick} type="button" value="update" /> */}
        </div>
        <div style={{ position: 'absolute', width: "60%", height: "70%" }}>
          {/* <GMapReact center={center} zoom={15} /> */}
          <GoogleMapReact
          bootstrapURLKeys={{ key: [GOOGLE_API_KEY] }}
          center={center}
          zoom={15}
          yesIWantToUseGoogleMapApiInternals
        />
        </div>
      </div>
    );
  }
}

// if (GOOGLE_API_KEY === "ENTER_API_KEY_HERE") {
//   render(
//     <div>
//       <h1>Enter Google API Key in GOOGLE_API_KEY const</h1>
//     </div>,
//     document.getElementById("root")
//   );
// } else {
  render(
    <div style={{ width: "60%", height: "70%" }}>
      <MapUpdate />
    </div>,
    document.getElementById("root")
  );
// }

export { MapUpdate, GMapReact };