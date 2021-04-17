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

  const doView = async event => 
  {
    event.preventDefault();
    var p = parseInt(event.target.id);
    // var college = {college:coll.result[p].Name};
    // localStorage.setItem('college_event', JSON.stringify(college));
    var obj = {college:coll.result[p].Name, user_coll:user.college};
    var js = JSON.stringify(obj);
    try{
      const response = await fetch('http://localhost:5000/api/viewCollegeEvents',
       {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
      var res = JSON.parse(await response.text());
      console.log(res);
      localStorage.setItem('pub_events', JSON.stringify(res.pub));
      localStorage.setItem('priv_events', JSON.stringify(res.priv));
      window.location.href = "/personalCollegeEvents";
    }
    catch(e)
        {
            alert(e.toString());
            return;
        }    
    
  };


    return(
    <div>  
        <br></br>
      <h2 className="col text-center text"><b>Colleges</b></h2>
      <br></br>
      <div className="container">
          {coll.result.map(function(item) {
            pos++
            
            return (<div><div className="card">
              {/* <img src="img_avatar.png" alt="Avatar" style={divStyle} /> */}
              <div className="container">
                <h4><b>{item.Name}</b></h4>
                <h6>Address: {item.Address}</h6>
                <h6>Total Members: {item.Total}</h6>
                <p>{item.Description}</p>
                {/* <Button id={rso_pos} onClick={doEdit}>Edit</Button>
                &nbsp;&nbsp; */}
                <Button id={pos} onClick={doView}>View Events</Button>
              </div>
            </div>
            <br></br></div>)
          })}
        </div>
    </div>
    );
};

export default Colleges;