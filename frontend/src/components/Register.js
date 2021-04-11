  import React, { useState } from 'react';
import { Form,Button } from 'react-bootstrap';

function Register()
{
    var firstName;
    var lastName;
    var email;
    var userName;
    var password;
    var confirmPass;
    var college;
    const [message,setMessage] = useState('');
    var type;

    // const onChangeChoice = async event => {
    //     type = event.target.value;
    //     console.log(type);
    // };

    const doRegister = async event => 
    {
        event.preventDefault();

        var flag = 0;
        var error = [];
        console.log(type.value);

        if(type.value === "Super Admin" && college.value === "" && firstName.value && lastName.value && email.value && password.value && confirmPass.value)
        {
            flag = 1;
        }

        if(flag === 0)
        {
            if (type.value === "" || type.value === "Choose Account Type..." || firstName.value === "" || college.value === "" || lastName.value === "" || email.value === "" || password.value === "" || confirmPass.value === "") {
                error.push("Please fill out all fields\n");
                setMessage(error);
                return;
            }
        }
        
        if(password.value !== confirmPass.value)
        {
            error.push("Password does not match\n");
            setMessage(error);
            return;
        }

        var obj = {firstname:firstName.value, lastname:lastName.value, email:email.value, college:college.value, login:userName.value, password:password.value, type:type.value};
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch('http://localhost:5000/api/Register',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.error === "" )
            {
                // setMessage("Account Created. \nCheck your email for verification link");
                setMessage("Account Created");
                setTimeout(() => {
                    window.location.href = '/';
                  },5000);
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
    }; 

    return(
      <div>
          <Form className="loginform">
            <h3 className="loginlabel">Create An Account</h3>
            <Form.Group controlId="formBasicFirst">
                <Form.Control className="login-input" type="fname" placeholder="First Name" ref={(c) => firstName = c}/>
            </Form.Group>
            <Form.Group controlId="formBasicLast">
                <Form.Control className="login-input" type="lname" placeholder="Last Name" ref={(c) => lastName = c}/>
            </Form.Group>
            <Form.Group controlId="formBasicEmailAdr">
                <Form.Control className="login-input" type="email" placeholder="Email" ref={(c) => email = c}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Control className="login-input" type="college" placeholder="University  (Blank if Super Admin)" ref={(c) => college = c}/>
            </Form.Group>
            <Form.Group controlId="formBasicUsername">
                <Form.Control className="login-input" type="username" placeholder="Username" ref={(c) => userName = c}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Control className="login-input" type="password" placeholder="Password" ref={(c) => password = c}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Control className="login-input" type="password" placeholder="Re-enter Password" ref={(c) => confirmPass = c}/>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
                {/* <Form.Label>Example select</Form.Label> */}
                <Form.Control as="select" custom  ref={(c) => type = c}>
                <option>Choose Account Type...</option>
                <option>Student</option>
                <option>Admin</option>
                <option>Super Admin</option>
                </Form.Control>
            </Form.Group>
            <Button size="lg" variant="primary" type="submit" onClick={doRegister} block>
                Sign Up
            </Button>
            <div className="col text-center">
            <span id="loginResult">{message}</span>
            </div>
            <hr></hr>
            <div>
                <a href="/">Back to Login</a>
            </div>
        </Form>
      </div>
    );
};

export default Register;