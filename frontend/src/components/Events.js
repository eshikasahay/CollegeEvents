import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function Events()
{
  var loginUserName;
  var loginPassword;

  const [message,setMessage] = useState('');

  const doEvents = async event => 
    {
        event.preventDefault();

        var obj = {login:loginUserName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch('http://localhost:5000/api/login',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());
            if( res.firstName === "" )
            {
                setMessage('Username/Password combination incorrect');
            }
            else if(!res.Validated)
            {
                setMessage('Check your email to verify account');
            }
            else
            {
                var user = {email:res.Email,firstName:res.firstName,lastName:res.lastName,id:res.id,userName:res.UserName}
                localStorage.setItem('user_data', JSON.stringify(user));
                
                setMessage('');
                window.location.href = '/home';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };


    return(
    <div>  
      
    </div>
    );
};

export default Events;