
import React, { useState } from 'react';
import { Form,Button, InputGroup, FormControl } from 'react-bootstrap';

function ViewCollEvents()
{
    var title;
    var college;
    var description;
    var admin;
    const [message,setMessage] = useState('');
    var pub = JSON.parse(localStorage.getItem("pub_events"));
    var priv = JSON.parse(localStorage.getItem("priv_events"));
    var rso_pos = -1;
    var pos = -1;

    const divStyle = {
        width: '90%',
      };

    const doJoin = async event => 
    {
        // event.preventDefault();
        // var error = [];
        // var p = parseInt(event.target.id);
        // var obj2 = {title:rso.results[p].Title,total:rso.results[p].Total};
        // var js2 = JSON.stringify(obj2);

        // try
        // {    
        //     const response2 = await fetch('http://localhost:5000/api/approveRSO',
        //         {method:'POST',body:js2,headers:{'Content-Type': 'application/json'}});

        //     var res2 = JSON.parse(await response2.text());
        //     setMessage("RSO has been Approved");
        //     //reset rso_to_approve
        //     if(user.status === "Admin")
        //         {
        //             var obj = {user:user.userName,approved:false,members:3};
        //             var js = JSON.stringify(obj);

        //             try
        //             {    
        //                 const response = await fetch('http://localhost:5000/api/getAdminRSO',
        //                     {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

        //                 var res = JSON.parse(await response.text());
        //                 localStorage.setItem('approve_rso', JSON.stringify(res));
                        
        //             }
        //             catch(e)
        //             {
        //                 alert(e.toString());
        //                 return;
        //             }
                    
        //         }
        // }
        // catch(e)
        // {
        //     alert(e.toString());
        //     return;
        // }    
        
            
    }; 

    return(
      <div>
          <br></br>
          <h2 className="text col text-center"><b>College Events</b></h2>
        <br></br>
        <h4 className="text col text-center"><u><b>Private Events</b></u></h4>
        <br></br>
        <div className="container">
          {priv.map(function(item) {
            rso_pos++
            
            return (<div className="card">
              <img src="img_avatar.png" alt="Avatar" style={divStyle} />
              <div className="container">
                <h4><b>Event: <b className="topic">{item.Name}</b></b></h4>
                <h5><b>Location:</b> {item.Location}</h5>
                <h5><b>Date:</b> {item.Date} &nbsp; <b>Time:</b> {item.Time}</h5>
                <h6><b>College:</b> {item.College}<br></br><b>Attending:</b> {item.Total}</h6>
                <p><b>About:</b> {item.Description}</p>
                {/* <Button id={rso_pos} onClick={doEdit}>Edit</Button>
                &nbsp;&nbsp; */}
                <h6><b>Email:</b> {item.Email}  <br></br><b>Phone:</b> {item.Phone}</h6>
                {/* <Button id={pubpos} onClick={joinPub}>Attend</Button> */}
              </div>
            </div>)
          })}
        </div>
        <br></br>
        <h4 className="text col text-center"><u><b>Public Events</b></u></h4>
        <br></br>
        <div className="container">
          {pub.map(function(item) {
            pos++
            
            return (<div className="card">
              <img src="img_avatar.png" alt="Avatar" style={divStyle} />
              <div className="container">
                <h4><b>Event: <b className="topic">{item.Name}</b></b></h4>
                <h5><b>Location:</b> {item.Location}</h5>
                <h5><b>Date:</b> {item.Date} &nbsp; <b>Time:</b> {item.Time}</h5>
                <h6><b>College:</b> {item.College}<br></br><b>Attending:</b> {item.Total}</h6>
                <p><b>About:</b> {item.Description}</p>
                {/* <Button id={rso_pos} onClick={doEdit}>Edit</Button>
                &nbsp;&nbsp; */}
                <h6><b>Email:</b> {item.Email}  <br></br><b>Phone:</b> {item.Phone}</h6>
                {/* <Button id={pos} onClick={joinPub}>Attend</Button> */}
              </div>
            </div>)
          })}
        </div>
      </div>
    );
};

export default ViewCollEvents;