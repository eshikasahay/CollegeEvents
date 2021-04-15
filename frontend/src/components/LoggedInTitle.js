import React, {useState} from 'react';
import { Navbar, Button, Nav, Form, FormControl, Modal } from 'react-bootstrap';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Logout
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to log out?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={dologout} variant="danger">Yes</Button>
      </Modal.Footer>
    </Modal>
  );
}

const dologout = async event =>
  {
    event.preventDefault();

    localStorage.removeItem("user_data")
    window.location.href = '/';
  }

function PageTitle()
{

  var user = JSON.parse(localStorage.getItem("user_data"));
  // console.log(user.status);
  const [message,setMessage] = useState('');
  const [modalShow, setModalShow] = React.useState(false);
  
  const doCollege = async event => 
  {
    event.preventDefault();
    var error = [];

        var obj = {user:user.userName};
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch('http://localhost:5000/api/getColleges',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());
            console.log(res);
            localStorage.setItem('colleges', JSON.stringify(res));
            window.location.href = "/college";
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }  

  };

  const doEvents = async event =>
  {
    event.preventDefault();
    var error = [];

        
        var obj2 = {user:user.userName};
        var js2 = JSON.stringify(obj2);
        try
        {

            const response2 = await fetch('http://localhost:5000/api/getAttendingEvents',
                {method:'POST',body:js2,headers:{'Content-Type': 'application/json'}});

            var res2 = JSON.parse(await response2.text());
            console.log(res2);
            localStorage.setItem('attending_events', JSON.stringify(res2.results));
            var obj = {college:user.college, attend:res2.results};
            var js = JSON.stringify(obj);
            const response = await fetch('http://localhost:5000/api/getEvents',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());
            console.log(res);
            localStorage.setItem('public_events', JSON.stringify(res.public));
            localStorage.setItem('private_events', JSON.stringify(res.private));

            window.location.href = "/home";
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }  

  };

  const doRSO = async event => 
  {
    event.preventDefault();
        var error = [];

        var obj = {user:user.userName};
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch('http://localhost:5000/api/getMyRso',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());
            console.log(res);
            localStorage.setItem('user_created_rso', JSON.stringify(res));

            var obj2 = {user:user.userName};
            var js2 = JSON.stringify(obj2);
            try
            {    
                const response2 = await fetch('http://localhost:5000/api/otherRSOs',
                    {method:'POST',body:js2,headers:{'Content-Type': 'application/json'}});

                var res2 = JSON.parse(await response2.text());
                console.log(res2);
                localStorage.setItem('other_rso', JSON.stringify(res2));
                var obj3 = {user:user.userName};
                var js3 = JSON.stringify(obj3);
                const response3 = await fetch('http://localhost:5000/api/getjoinedRSO',
                    {method:'POST',body:js3,headers:{'Content-Type': 'application/json'}});

                var res3 = JSON.parse(await response3.text());
                console.log(res3);
                localStorage.setItem('joined_rso', JSON.stringify(res3));
                var obj5 = {admin:user.userName};
                var js5 = JSON.stringify(obj5);
                const response5 = await fetch('http://localhost:5000/api/getAdminOwnedRSO',
                    {method:'POST',body:js5,headers:{'Content-Type': 'application/json'}});

                var res5 = JSON.parse(await response5.text());
                console.log(res5);
                localStorage.setItem('admin_rso', JSON.stringify(res5));
                // console.log(res3);
                window.location.href = '/rso';
                
            }
            catch(e)
            {
                alert(e.toString());
                return;
            }  
                
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }  
      
        
  };
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
      return {__html: '<a href="/createEvent" class="button">Create Events</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="/approveRSO" class="button">Approve RSOs</a>'};
      // return {__html: '<Button>Create Event</Button>'};
    }
    else if(user.status === "Super Admin")
    {
      return {__html: '<a href="/createColl" class="button">Add a University</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="/approveEvents" class="button">Approve Events</a>'};
      // return {__html: '<Button>Add a University</Button>'};
    } 
  };


  return(
     <div>
       <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home" className="title">..Cvents..</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link className="login-name" onClick={doEvents}>Events</Nav.Link>
          <Nav.Link className="login-name" onClick={doRSO}>RSOs</Nav.Link>
          <Nav.Link className="login-name" onClick={doCollege}>Colleges</Nav.Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div dangerouslySetInnerHTML={createMarkup()} className="custom-link" />
        </Nav>
        <Form inline>
          {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button> */}
          {/* <a className="login-name" onClick={() => setModalShow(true)}>{user.firstName} {user.lastName}</a> */}
          <Nav className="mr-auto">
          <Nav.Link className="login-name" onClick={() => setModalShow(true)}>{user.firstName} {user.lastName}</Nav.Link>
          </Nav>
        </Form>
      </Navbar>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
            <br></br>
     </div>
   );
};

export default PageTitle;