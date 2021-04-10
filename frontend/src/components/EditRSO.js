import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function EditRSO()
{

  const [message,setMessage] = useState('');
  var edit_rso = JSON.parse(localStorage.getItem("edit_rso"));
  var user = JSON.parse(localStorage.getItem("user_data"));
  var title, college, admin, description;
//   var rso = JSON.parse(localStorage.getItem("user_created_rso"));
//   var other_rso = JSON.parse(localStorage.getItem("other_rso"));
//   var joined_rso = JSON.parse(localStorage.getItem("joined_rso"));

  const doEdit = async event => 
  {
  // console.log(other_rso.results[p].Title);
  
      var obj = {title:edit_rso.Title, newTitle:title.value, newCollege:college.value, newAdmin:admin.value, newDesc:description.value};
      var js = JSON.stringify(obj);
        console.log(js);
      try
      {    
          const response = await fetch('http://localhost:5000/api/editRSO',
              {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

          var res = JSON.parse(await response.text());
          
          var obj3 = {user:user.userName};
          var js3 = JSON.stringify(obj3);
            const response3 = await fetch('http://localhost:5000/api/getMyRso',
                {method:'POST',body:js3,headers:{'Content-Type': 'application/json'}});

            var res3 = JSON.parse(await response3.text());
            console.log(res3);
            localStorage.setItem('user_created_rso', JSON.stringify(res3));

            var obj2 = {user:user.userName};
            var js2 = JSON.stringify(obj2); 
                const response2 = await fetch('http://localhost:5000/api/otherRSOs',
                    {method:'POST',body:js2,headers:{'Content-Type': 'application/json'}});

                var res2 = JSON.parse(await response2.text());
                console.log(res2);
                localStorage.setItem('other_rso', JSON.stringify(res2));
                var obj4 = {user:user.userName};
                var js4 = JSON.stringify(obj4);
                const response4 = await fetch('http://localhost:5000/api/getjoinedRSO',
                    {method:'POST',body:js4,headers:{'Content-Type': 'application/json'}});

                var res4 = JSON.parse(await response4.text());
                console.log(res4);
                localStorage.setItem('joined_rso', JSON.stringify(res4));
                console.log(res4);
                window.location.href = '/rso';  
      }
      catch(e)
      {
          console.log("lalalalalalal");
          alert(e.toString());
          return;
      }    
    };
  

    return(
    <div>  
        <Form className="loginform">
            <h3 className="loginlabel">Edit RSO</h3>
            <Form.Group controlId="formBasicFirst">
                <Form.Control className="login-input" type="title" defaultValue={edit_rso.Title} ref={(c) => title = c}/>
            </Form.Group>
            <Form.Group controlId="formBasicLast">
                <Form.Control className="login-input" type="description" defaultValue={edit_rso.College} ref={(c) => college = c}/>
            </Form.Group>
            <Form.Group controlId="formBasicLast">
                <Form.Control className="login-input" type="admin" defaultValue={edit_rso.Admin} ref={(c) => admin = c}/>
            </Form.Group>
            {/* <InputGroup size="lg">
                <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-lg"></InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="Description" className="description" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
            </InputGroup> */}
            <textarea id="descriptionRso" name="description" rows="4" cols="36" defaultValue={edit_rso.Description} ref={(c) => description = c}></textarea>
            
            <br></br>
            <Button size="lg" variant="primary" type="submit" onClick={doEdit} block>
               Update
            </Button>
            <div className="col text-center">
            <span id="loginResult">{message}</span>
            </div>
            <hr></hr>
            
        </Form>
        {/* <br></br>
        <h2 className="col text-center text"><b>Are You Sure You Want to Delete the Following RSO?</b></h2>
        <br></br>
        <div className="container">
        <div className="card">
            <img src="img_avatar.png" alt="Avatar" style={divStyle} />
            <div className="container">
                <h4><b>Organization: {del_rso.Title}</b></h4>
                <h6>College: {del_rso.College}&nbsp;&nbsp;|&nbsp;&nbsp;Total Members: {del_rso.Total}</h6>
                <p>{del_rso.Description}</p>
            </div>
            </div>
        </div>
        <br></br>
        <br></br>
        <div className="col text-center">
        <Button href="/rso">Cancel</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button variant="danger">Delete</Button>
        </div> */}
        
    </div>
    );
};

export default EditRSO;