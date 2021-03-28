import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function RSO()
{
  var user = JSON.parse(localStorage.getItem("user_data"));
  const [message,setMessage] = useState('');
  var rso = JSON.parse(localStorage.getItem("user_created_rso"));
  
  function createMarkup() 
  { 
    // return {__html: '<a className="text" href="url">Create RSO</a>'};
    var html_string = '';
    var length = rso.length;
    for(var i = 0; i<length; i++)
    {
      html_string.concat('<div><Card><Card.Img variant="top" src="holder.js/100px180" /><Card.Body><Card.Title>Card Title</Card.Title><Card.Text>Some quick example text to build on the card title and make up the bulk of the cards content.</Card.Text><Button variant="primary">Go somewhere</Button></Card.Body></Card></div>');
    }
    return {__html: html_string};
  };
  
  return(
    <div>  
        <br></br>
        <h2 className="col text-center text">Registered Student Organizations</h2>
        <br></br>
        <br></br>
        <h4 className="text col text-center">My RSOs</h4>
        <div dangerouslySetInnerHTML={createMarkup()} />
    </div>
    );
};

export default RSO;