
import React, { useState } from 'react';
import { Form,Button, InputGroup, FormControl } from 'react-bootstrap';

function CreateRso()
{
    var title;
    var college;
    var description;
    var admin;
    const [message,setMessage] = useState('');
    var user = JSON.parse(localStorage.getItem("user_data"));


    const doCreateRso = async event => 
    {
        event.preventDefault();

        var flag = 0;
        var error = [];

        if (title.value === "" || description.value === "") {
            flag = 1;
            error.push("Please fill out all fields\n");
        }

        if (flag === 1)
        {
            setMessage(error);
            return;
        }
       
        var obj2 = {username:admin.value,college:user.college};
        var js2 = JSON.stringify(obj2);

        try
        {    
            const response2 = await fetch('http://localhost:5000/api/searchAdmin',
                {method:'POST',body:js2,headers:{'Content-Type': 'application/json'}});

            var res2 = JSON.parse(await response2.text());
            console.log(res2);
            if( res2.error.length === 0 )
            {
                var obj = {title:title.value, college:user.college, admin:admin.value, description:description.value, username:user.userName, members:user, total:1};
                var js = JSON.stringify(obj);

                try
                {    
                    const response = await fetch('http://localhost:5000/api/CreateRso',
                        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

                    var res = JSON.parse(await response.text());
                    console.log(res);
                    if( res.error === "" )
                    {
                        setMessage("RSO Requested. Confirmation Pending");
                    }
                    else
                    {
                        setMessage(res.error);
                    }
                }
                catch(e)
                {
                    alert(e.toString());
                    return;
                }   
            }
            else
            {
                setMessage(res2.error);
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
          <Form className="loginform">
            <h3 className="loginlabel">Request An RSO</h3>
            <Form.Group controlId="formBasicFirst">
                <Form.Control className="login-input" type="title" placeholder="RSO Name" ref={(c) => title = c}/>
            </Form.Group>
            {/* <Form.Group controlId="formBasicLast">
                <Form.Control className="login-input" type="description" placeholder="University" ref={(c) => college = c}/>
            </Form.Group> */}
            <Form.Group controlId="formBasicLast">
                <Form.Control className="login-input" type="admin" placeholder="Admin Username" ref={(c) => admin = c}/>
            </Form.Group>
            {/* <InputGroup size="lg">
                <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-lg"></InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="Description" className="description" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
            </InputGroup> */}
            <textarea id="descriptionRso" name="description" rows="4" cols="36" placeholder="  Description" ref={(c) => description = c}></textarea>
            
            <br></br>
            <Button size="lg" variant="primary" type="submit" onClick={doCreateRso} block>
               Submit
            </Button>
            <div className="col text-center">
            <span id="loginResult">{message}</span>
            </div>
            <hr></hr>
            
        </Form>
      </div>
    );
};

export default CreateRso;