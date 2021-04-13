import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function Events()
{
  var loginUserName;
  var loginPassword;
  var user = JSON.parse(localStorage.getItem("user_data"));
  var privpos = -1;
  var pubpos = -1;
  var pub = JSON.parse(localStorage.getItem("public_events"));
  console.log(pub);
  var priv = JSON.parse(localStorage.getItem("private_events"));
  console.log(priv);
  const [message,setMessage] = useState('');

  const doEvents = async event => 
    {
        
    };

    const divStyle = {
      width: '90%',
    };

    return(
      <div>  
      {/* <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      /> */}
        <br></br>
        <h2 className="col text-center text"><b>Events</b></h2>
        <br></br>
        <br></br>
        <h4 className="text col text-center"><u><b>Private Events</b></u></h4>
        <br></br>
        {/* <div dangerouslySetInnerHTML={createMarkup()} className="card container" /> */}
        {/* <ul> */}
        <div className="container">
          {priv.map(function(item) {
            privpos++
            
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
                <h6><b>Email:</b> {item.Email}<br></br>  <b>Phone:</b> {item.Phone}</h6>
                <Button id={privpos} onClick={doEvents}>Attend</Button>
              </div>
            </div>)
          })}
        </div>
        <br></br>
        <h4 className="text col text-center"><u><b>Public Events</b></u></h4>
        <br></br>
        {/* <div dangerouslySetInnerHTML={createMarkup()} className="card container" /> */}
        {/* <ul> */}
        <div className="container">
          {pub.map(function(item) {
            pubpos++
            
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
                <Button id={pubpos} onClick={doEvents}>Attend</Button>
              </div>
            </div>)
          })}
        </div>
    </div>
    );
};

export default Events;