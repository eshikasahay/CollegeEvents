import React from 'react';
import { Navbar, Button, Nav, Form, FormControl } from 'react-bootstrap';

function PageTitle()
{

  var user = JSON.parse(localStorage.getItem("user_data"));

   return(
     <div>
       <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home" className="title">..Cvents..</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link className="login-name" href="#home">Events</Nav.Link>
          <Nav.Link className="login-name" href="#rso">RSOs</Nav.Link>
          <Nav.Link className="login-name" href="#college">Colleges</Nav.Link>
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