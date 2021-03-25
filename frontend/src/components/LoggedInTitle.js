import React from 'react';
import { Navbar, Button, Nav, Form, FormControl } from 'react-bootstrap';

function PageTitle()
{

  var user = JSON.parse(localStorage.getItem("user_data"));
  // console.log(user.status);
  
  function createMarkup() 
  { 
    // return {__html: '<a className="text" href="url">Create RSO</a>'};
    if(user.status === "Student")
    {
      return {__html: '<a href="/createRso" class="button">Request an RSO</a>'};
      // return {__html: '<Button onClick={dorso}>Create RSO</Button>'};
    }
    else if(user.status === "Admin")
    {
      return {__html: '<a href="/createEvent" class="button">Create Events</a>'};
      // return {__html: '<Button>Create Event</Button>'};
    }
    else if(user.status === "Super Admin")
    {
      return {__html: '<a href="/createColl" class="button">Add a University</a>'};
      // return {__html: '<Button>Add a University</Button>'};
    } 
  };


  return(
     <div>
       <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home" className="title">..Cvents..</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link className="login-name" href="/home">Events</Nav.Link>
          <Nav.Link className="login-name" href="/rso">RSOs</Nav.Link>
          <Nav.Link className="login-name" href="/college">Colleges</Nav.Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div dangerouslySetInnerHTML={createMarkup()} className="custom-link" />
        </Nav>
        <Form inline>
          {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button> */}
          <div className="login-name">{user.firstName} {user.lastName}</div>
        </Form>
      </Navbar>
     </div>
   );
};

export default PageTitle;