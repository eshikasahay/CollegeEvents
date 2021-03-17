import React from 'react';
import { Navbar, Button, Nav, Form, FormControl } from 'react-bootstrap';

function PageTitle()
{

   return(
     <div>
       <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home" className="title">..Cvents..</Navbar.Brand>
        <Nav className="mr-auto">
          {/* <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link> */}
        </Nav>
        
      </Navbar>
     </div>
   );
};

export default PageTitle;