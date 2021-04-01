import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function RSO()
{
  var user = JSON.parse(localStorage.getItem("user_data"));
  const [message,setMessage] = useState('');
  var rso = JSON.parse(localStorage.getItem("user_created_rso"));
  var rso_pos = -1;
  function createMarkup() 
  { 
    // return {__html: '<div class="card"><img src="img_avatar.png" alt="Avatar" style="width:100%"><div class="container"><h4><b>{rso.results[i].Title}</b></h4><p>Architect & Engineer</p></div></div>'};
    var html_string = '';
    var length = rso.results.length;
    console.log(rso.results[0].Title);
    for(var i = 0; i<length; i++)
    {
      html_string+= `<div class="card"><img src="img_avatar.png" alt="Avatar" style="width:90%"><div class="container"><h4><b>Organization: {{rso.results[i].Title}}</b></h4><h6>College: {rso.results[i].College}</h6><p>{rso.results[i].Description}</p></div></div>`;
    }
    return {__html: html_string};
  };
  
  const divStyle = {
    width: '90%',
  };

  const doEdit = async event => 
  {
    event.preventDefault();
    console.log(event.target.id);
  };

  const doDelete = async event => 
  {
    event.preventDefault();
    console.log(event.target.id);
  };

  return(
    <div>  
        <br></br>
        <h2 className="col text-center text">Registered Student Organizations</h2>
        <br></br>
        <br></br>
        <h4 className="text col text-center">My RSOs</h4>
        {/* <div dangerouslySetInnerHTML={createMarkup()} className="card container" /> */}
        {/* <ul> */}
        <div className="container">
          {rso.results.map(function(item) {
            rso_pos++
            if(item.Accepted === false)
            {
              return (<div className="card">
              <img src="img_avatar.png" alt="Avatar" style={divStyle} />
              <div className="container">
                <h5 className="rso-pending">(Pending Admin Approval)</h5>
                <h4><b>Organization: {item.Title}</b></h4>
                <h6>College: {item.College}</h6>
                <p>{item.Description}</p>
                <Button id={rso_pos} onClick={doEdit}>Edit</Button>
                &nbsp;&nbsp;
                <Button variant="danger" id={rso_pos} onClick={doDelete}>Delete</Button>
              </div>
              </div>)
            }
            return (<div className="card">
              <img src="img_avatar.png" alt="Avatar" style={divStyle} />
              <div className="container">
                <h4><b>Organization: {item.Title}</b></h4>
                <h6>College: {item.College}</h6>
                <p>{item.Description}</p>
                <Button id={rso_pos} onClick={doEdit}>Edit</Button>
                &nbsp;&nbsp;
                <Button variant="danger" id={rso_pos} onClick={doDelete}>Delete</Button>
              </div>
            </div>)
          })}
        </div>
    </div>
    );
};

export default RSO;