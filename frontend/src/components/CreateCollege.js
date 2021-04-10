import React, { useState } from 'react';
import { Form,Button, Card } from 'react-bootstrap';
import MapContainer from '../components/GoogleMap.js';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {MapUpdate, GMapReact} from '../components/NewMap.js';



function CreateCollege()
{
    var name;
    var lat, long;
    var description;
    var total;
    const [message,setMessage] = useState('');
    var type;

    // const onChangeChoice = async event => {
    //     type = event.target.value;
    //     console.log(type);
    // };

    const doCreateColl = async event => 
    {
        event.preventDefault();  
        var location = JSON.parse(localStorage.getItem("location"));  
        console.log(location);
    }; 


    return(
      <div className="container more">
          <br></br>
         <Card>
            
             <Form className="collsize">
                 <div className="text col text-center">
                     <br></br>
                    <h3><b>Create a University Profile</b></h3>
                 </div>
             
                 <br></br>
                 <Form.Group controlId="formBasicFirst">
                    <Form.Control className="login-input" type="fname" placeholder="University Name" ref={(c) => name = c}/>
                 </Form.Group>
                 {/* <Form.Group controlId="formBasicLast">
                <Form.Control className="login-input" type="lname" placeholder="Latitude Location" ref={(c) => lat = c}/>
                </Form.Group>
                <Form.Group controlId="formBasicLast">
                <Form.Control className="login-input" type="lname" placeholder="Longitude Location" ref={(c) => long = c}/>
                </Form.Group> */}
                <Form.Group controlId="formBasicUsername">
                    <Form.Control className="login-input" type="username" placeholder="Total Students" ref={(c) => total = c}/>
                </Form.Group>
                <textarea id="descriptionRso" name="description" rows="4" cols="78" placeholder="  Description" ref={(c) => description = c}></textarea>
                
             </Form>
             <br></br>
         </Card>
         <br></br>
         
         <MapUpdate/>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <Button className="buttonsize" size="lg" variant="primary" type="submit" onClick={doCreateColl} block>
                Create Profile
         </Button>
         
         <br></br>
         <br></br>
          
      </div>
    );
};

export default CreateCollege;