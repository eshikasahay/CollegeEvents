import React, { useState } from 'react';
import { Form,Button, Card } from 'react-bootstrap';
import MapContainer from '../components/GoogleMap.js';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {MapUpdate, GMapReact} from '../components/NewMap.js';



function CreateCollege()
{
    var name, address;
    var description;
    var total;
    const [message,setMessage] = useState('');
    var type;
    var user = JSON.parse(localStorage.getItem("user_data"));

    const doCreateColl = async event => 
    {
        event.preventDefault();  
        var location = JSON.parse(localStorage.getItem("location"));  
        console.log(location);
        
        if(!name.value || !total.value || !description.value || !location.lat || !location.lng)
        {
            setMessage("Please fill out all fields");
            return;
        }
        if(Number(total.value) < 0)
        {
            setMessage("Total students cannot be negative");
            return;
        }

        var obj = {name:name.value, total:Number(total.value), description:description.value, address:address.value, lat:location.lat, lng:location.lng, sadmin:user.userName};
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch('http://localhost:5000/api/CreateCollege',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.error === "" )
            {
                // setMessage("Account Created. \nCheck your email for verification link");
                setMessage("Profile Created");
            }
            else
            {
                setMessage(res.error);
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
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
                <Form.Group controlId="formBasicUsername">
                    <Form.Control className="login-input" type="username" placeholder="Address" ref={(c) => address = c}/>
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
         <div className="col text-center">{message}</div>
         <br></br>
         <br></br>
          
      </div>
    );
};

export default CreateCollege;