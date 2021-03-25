import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function RSO()
{
  var loginUserName;
  var loginPassword;

  const [message,setMessage] = useState('');

  const doEvents = async event => 
    {
        
    };


    return(
    <div>  
        <br></br>
        <h2 className="col text-center text">Registered Student Organizations</h2>
        <br></br>
        <br></br>
        <h4 className="text col text-center">My RSOs</h4>
    </div>
    );
};

export default RSO;