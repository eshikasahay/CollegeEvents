import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function Events()
{
  var loginUserName;
  var loginPassword;
  var attend = JSON.parse(localStorage.getItem("attending_events"));
  console.log(attend);
  var attpos = -1;
  var user = JSON.parse(localStorage.getItem("user_data"));
  var privpos = -1;
  var pubpos = -1;
  var pub = JSON.parse(localStorage.getItem("public_events"));
  console.log(pub);
  var priv = JSON.parse(localStorage.getItem("private_events"));
  console.log(priv);
  const [message1,setMessage1] = useState('');
  const [message2,setMessage2] = useState('');
  

  const joinPriv = async event => 
    {
      event.preventDefault();
      var p = parseInt(event.target.id);
      console.log(priv[p].Name);
      
      
      var obj = {member:user, name:priv[p].Name};
          var js = JSON.stringify(obj);
  
          try
          {    
              const response = await fetch('http://localhost:5000/api/joinPrivEvent',
                  {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
  
              var res = JSON.parse(await response.text());
              console.log(res);
              if(res.existing === 1)
              {
                setMessage1("Already Joined");
              }
              var obj2 = {user:user.userName};
        var js2 = JSON.stringify(obj2);
              const response2 = await fetch('http://localhost:5000/api/getAttendingEvents',
                {method:'POST',body:js2,headers:{'Content-Type': 'application/json'}});

            var res2 = JSON.parse(await response2.text());
            console.log(res2);
            localStorage.setItem('attending_events', JSON.stringify(res2.results));
            var obj3 = {college:user.college, attend:res2.results};
            var js3 = JSON.stringify(obj3);
            const response3 = await fetch('http://localhost:5000/api/getEvents',
                {method:'POST',body:js3,headers:{'Content-Type': 'application/json'}});

            var res3 = JSON.parse(await response3.text());
            console.log(res3);
            localStorage.setItem('public_events', JSON.stringify(res3.public));
            localStorage.setItem('private_events', JSON.stringify(res3.private));

            window.location.href = "/home";
               
          }
          catch(e)
          {
              alert(e.toString());
              return;
          }    
    };

    const joinPub = async event =>
    {
      event.preventDefault();
      var p = parseInt(event.target.id);
      console.log(pub[p].Name);
      
      
      var obj = {member:user, name:pub[p].Name};
          var js = JSON.stringify(obj);
  
          try
          {    
              const response = await fetch('http://localhost:5000/api/joinPubEvent',
                  {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
  
              var res = JSON.parse(await response.text());
              console.log(res);
              if(res.existing === 1)
              {
                setMessage1("Already Joined");
              }
              var obj2 = {user:user.userName};
              var js2 = JSON.stringify(obj2);
              const response2 = await fetch('http://localhost:5000/api/getAttendingEvents',
                {method:'POST',body:js2,headers:{'Content-Type': 'application/json'}});

            var res2 = JSON.parse(await response2.text());
            console.log(res2);
            localStorage.setItem('attending_events', JSON.stringify(res2.results));
            var obj3 = {college:user.college, attend:res2.results};
            var js3 = JSON.stringify(obj3);
            const response3 = await fetch('http://localhost:5000/api/getEvents',
                {method:'POST',body:js3,headers:{'Content-Type': 'application/json'}});

            var res3 = JSON.parse(await response3.text());
            console.log(res3);
            localStorage.setItem('public_events', JSON.stringify(res3.public));
            localStorage.setItem('private_events', JSON.stringify(res3.private));

            window.location.href = "/home";
               
          }
          catch(e)
          {
              alert(e.toString());
              return;
          }    
    };

    const doLeave = async event =>
    {
      event.preventDefault();
      var p = parseInt(event.target.id);
      console.log(attend[p].Name);
      
      
      var obj = {member:user, title:attend[p].Name};
      var js = JSON.stringify(obj);
  
          try
          {    
              const response = await fetch('http://localhost:5000/api/leaveEvent',
                  {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
  
              var res = JSON.parse(await response.text());
              console.log(res);
              // if(res.existing === 1)
              // {
              //   setMessage1("Already Joined");
              // }
              var obj2 = {user:user.userName};
              var js2 = JSON.stringify(obj2);
              const response2 = await fetch('http://localhost:5000/api/getAttendingEvents',
                {method:'POST',body:js2,headers:{'Content-Type': 'application/json'}});

            var res2 = JSON.parse(await response2.text());
            console.log(res2);
            localStorage.setItem('attending_events', JSON.stringify(res2.results));
            var obj3 = {college:user.college, attend:res2.results};
            var js3 = JSON.stringify(obj3);
            const response3 = await fetch('http://localhost:5000/api/getEvents',
                {method:'POST',body:js3,headers:{'Content-Type': 'application/json'}});

            var res3 = JSON.parse(await response3.text());
            console.log(res3);
            localStorage.setItem('public_events', JSON.stringify(res3.public));
            localStorage.setItem('private_events', JSON.stringify(res3.private));

            window.location.href = "/home";
               
          }
          catch(e)
          {
              alert(e.toString());
              return;
          }    
    };

    const divStyle = {
      width: '30%',
    };

    return(
      <div className="mid">  
      {/* <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      /> */}
        <br></br>
        
        <h2 className="col text-center text"><b>Events</b></h2>
        <br></br>
        <br></br>
        <h4 className="col text-center text"><u><b>Attending</b></u></h4>
        <br></br>

        <div className="container">
          {attend.map(function(item) {
            attpos++
            
            return (<div className="card">
              {/* <img src={image} alt="Avatar" style={divStyle} /> */}
              <div className="container">
              <h4><b>Event: <b className="topic">{item.Name}</b></b></h4>
                <h5><b>Location:</b> {item.Location}</h5>
                <h5><b>Date:</b> {item.Date} &nbsp; <b>Time:</b> {item.Time}</h5>
                <h6><b>College:</b> {item.College}<br></br><b>Attending:</b> {item.Total}</h6>
                <p><b>About:</b> {item.Description}</p>
                {/* <Button id={rso_pos} onClick={doEdit}>Edit</Button>
                &nbsp;&nbsp; */}
                <h6><b>Email:</b> {item.Email}<br></br>  <b>Phone:</b> {item.Phone}</h6>
                <Button id={attpos} variant="danger" onClick={doLeave}>Leave</Button><br></br>
                
              </div>
            </div>)
          })}
        </div>
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
                <Button id={privpos} onClick={joinPriv}>Attend</Button><br></br>
                <span className="rso-pending">{message1}</span>
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
                <Button id={pubpos} onClick={joinPub}>Attend</Button>
              </div>
            </div>)
          })}
        </div>
    </div>
    );
};

export default Events;