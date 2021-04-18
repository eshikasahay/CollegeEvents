import React, { useState } from 'react';
import { Form,Button,Card } from 'react-bootstrap';
import {MapUpdate, GMapReact} from '../components/NewMap.js';

function CreateEvent()
{
    var name;
    var location;
    var time;
    var date;
    var type;
    var description;
    var phone;
    var email;
    const [message,setMessage] = useState('');
    var user = JSON.parse(localStorage.getItem("user_data"));

    // const onChangeChoice = async event => {
    //     type = event.target.value;
    //     console.log(type);
    // };

    const doCreateEvent = async event => 
    {
        event.preventDefault();
        var loc = JSON.parse(localStorage.getItem("location"));  
        var flag = 0;
        var error = [];
        console.log(type.value);
        if (name.value === "" || location.value === "" || date.value === "" || time.value === "Select Start Time (1-hr event)..." || type.value === "Select Event Type..." || description.value === "" || phone.value === "" || email.value === "") {
            flag = 1;
            error.push("Please fill out all fields\n");
        }

        if (flag === 1)
        {
            setMessage(error);
            return;
        }
        
        var obj1 = {location:location.value, date:date.value, time:time.value};
        var js1 = JSON.stringify(obj1);

        try{
            const response1 = await fetch('http://localhost:5000/api/checkTime',
            {method:'POST',body:js1,headers:{'Content-Type': 'application/json'}});

            var res1 = JSON.parse(await response1.text());
            if(res1.results.length > 0)
            {
                setMessage("Time unavailable");
                return;
            }
            var obj = {name:name.value, location:location.value, date:date.value, time:time.value, type:type.value, college:user.college, description:description.value, phone:phone.value, email:email.value, admin:user.userName, lat:loc.lat, lng:loc.lng, user:user};
            var js = JSON.stringify(obj);
            const response = await fetch('http://localhost:5000/api/CreateEvent',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.error === "" )
            {
                // setMessage("Account Created. \nCheck your email for verification link");
                setMessage("Event created. Awaiting approval.");
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
                    <h3><b>Request an Event</b></h3>
                </div>
                <br></br>
                <Form.Group controlId="formBasicFirst">
                 <Form.Control className="login-input" type="fname" placeholder="Event Name" ref={(c) => name = c}/>
             </Form.Group>
             <Form.Group controlId="formBasicLast">
                 <Form.Control className="login-input" type="lname" placeholder="Location" ref={(c) => location = c}/>
             </Form.Group>
             <Form.Group controlId="formBasicEmailAdr">
                 <Form.Control className="login-input" type="email" placeholder="Date (MM/DD/YY)" ref={(c) => date = c}/>
             </Form.Group>
             <Form.Group controlId="exampleForm.ControlSelect1">
                 {/* <Form.Label>Example select</Form.Label> */}
                 <Form.Control as="select" custom  ref={(c) => time = c}>
                 <option>Select Start Time (1-hr event)...</option>
                 <option>8:00 AM</option>
                 <option>9:00 AM</option>
                 <option>10:00 AM</option>
                 <option>11:00 AM</option>
                 <option>12:00 PM</option>
                 <option>1:00 PM</option>
                 <option>2:00 PM</option>
                 <option>3:00 PM</option>
                 <option>4:00 PM</option>
                 <option>5:00 PM</option>
                 <option>6:00 PM</option>
                 <option>7:00 PM</option>
                 <option>8:00 PM</option>
                 <option>9:00 PM</option>
                 </Form.Control>
             </Form.Group>
             <Form.Group controlId="exampleForm.ControlSelect1">
                 {/* <Form.Label>Example select</Form.Label> */}
                 <Form.Control as="select" custom  ref={(c) => type = c}>
                 <option>Select Event Type...</option>
                 <option>Public Event</option>
                 <option>Private Event</option>
                 </Form.Control>
             </Form.Group>
             <textarea id="descriptionRso" name="description" rows="4" cols="79" placeholder="  Description" ref={(c) => description = c}></textarea>
             <Form.Group controlId="formBasicUsername">
                 <Form.Control className="login-input" type="username" placeholder="Email" ref={(c) => email = c}/>
             </Form.Group>
             <Form.Group controlId="formBasicPassword">
                 <Form.Control className="login-input" type="username" placeholder="Phone Number" ref={(c) => phone = c}/>
             </Form.Group>
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

         <Button size="lg" variant="primary" type="submit" onClick={doCreateEvent} block>
                 Submit Event
             </Button>
             <br></br>
             <div className="col text-center">
             <span id="loginResult">{message}</span>
             </div>
             <br></br>
             <br></br>

        </div>
    //   <div>
    //       <Form className="loginform">
    //         <h3 className="loginlabel">Create An Event</h3>
    //         <Form.Group controlId="formBasicFirst">
    //             <Form.Control className="login-input" type="fname" placeholder="Event Name" ref={(c) => name = c}/>
    //         </Form.Group>
    //         <Form.Group controlId="formBasicLast">
    //             <Form.Control className="login-input" type="lname" placeholder="Location" ref={(c) => location = c}/>
    //         </Form.Group>
    //         <Form.Group controlId="formBasicEmailAdr">
    //             <Form.Control className="login-input" type="email" placeholder="Date (MM/DD/YY)" ref={(c) => date = c}/>
    //         </Form.Group>
    //         <Form.Group controlId="exampleForm.ControlSelect1">
    //             {/* <Form.Label>Example select</Form.Label> */}
    //             <Form.Control as="select" custom  ref={(c) => time = c}>
    //             <option>Select Start Time (1-hr event)...</option>
    //             <option>8:00 AM</option>
    //             <option>9:00 AM</option>
    //             <option>10:00 AM</option>
    //             <option>11:00 AM</option>
    //             <option>12:00 PM</option>
    //             <option>1:00 PM</option>
    //             <option>2:00 PM</option>
    //             <option>3:00 PM</option>
    //             <option>4:00 PM</option>
    //             <option>5:00 PM</option>
    //             <option>6:00 PM</option>
    //             <option>7:00 PM</option>
    //             <option>8:00 PM</option>
    //             <option>9:00 PM</option>
    //             </Form.Control>
    //         </Form.Group>
    //         <Form.Group controlId="exampleForm.ControlSelect1">
    //             {/* <Form.Label>Example select</Form.Label> */}
    //             <Form.Control as="select" custom  ref={(c) => type = c}>
    //             <option>Select Event Type...</option>
    //             <option>Public Event</option>
    //             <option>Private Event</option>
    //             </Form.Control>
    //         </Form.Group>
    //         <textarea id="descriptionRso" name="description" rows="4" cols="36" placeholder="  Description" ref={(c) => description = c}></textarea>
    //         <Form.Group controlId="formBasicUsername">
    //             <Form.Control className="login-input" type="username" placeholder="Email" ref={(c) => email = c}/>
    //         </Form.Group>
    //         <Form.Group controlId="formBasicPassword">
    //             <Form.Control className="login-input" type="username" placeholder="Phone Number" ref={(c) => phone = c}/>
    //         </Form.Group>
            
    //         <Button size="lg" variant="primary" type="submit" onClick={doCreateEvent} block>
    //             Submit Event
    //         </Button>
    //         <div className="col text-center">
    //         <span id="loginResult">{message}</span>
    //         </div>
    //         <hr></hr>
    //     </Form>
    //   </div>
    );
};

export default CreateEvent;