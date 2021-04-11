import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function Colleges()
{
  var loginUserName;
  var loginPassword;
  var user = JSON.parse(localStorage.getItem("user_data"));
  var coll = JSON.parse(localStorage.getItem("colleges"));
  console.log(coll);
  var pos = -1;
  const [message,setMessage] = useState('');

  const doColleges = async event => 
  {
        
  };


    return(
    <div>  
        <br></br>
      <h2 className="col text-center text"><b>Colleges</b></h2>
      <br></br>
      <div className="container">
          {coll.result.map(function(item) {
            pos++
            
            return (<div className="card">
              {/* <img src="img_avatar.png" alt="Avatar" style={divStyle} /> */}
              <div className="container">
                <h4><b>{item.Name}</b></h4>
                <h6>Total Members: {item.Total}</h6>
                <p>{item.Description}</p>
                {/* <Button id={rso_pos} onClick={doEdit}>Edit</Button>
                &nbsp;&nbsp; */}
                <Button id={pos}>View Events</Button>
              </div>
            </div>)
          })}
        </div>
    </div>
    );
};

export default Colleges;