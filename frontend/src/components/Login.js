import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function Login()
{
  var loginUserName;
  var loginPassword;

  const [message,setMessage] = useState('');

  const doLogin = async event => 
    {
        event.preventDefault();
        var res;
        var obj = {login:loginUserName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch('http://localhost:5000/api/login',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            res = JSON.parse(await response.text());
            console.log(res.Status);
            if( res.firstName === "" )
            {
                setMessage('Username/Password combination incorrect');
            }
            // else if(!res.Validated)
            // {
            //     setMessage('Check your email to verify account');
            // }
            else
            {
                var user = {email:res.Email,firstName:res.firstName,lastName:res.lastName,userName:res.UserName,status:res.Status,college:res.College}
                localStorage.setItem('user_data', JSON.stringify(user));
                console.log(user);

                var obj3 = {user:user.userName};
                var js3 = JSON.stringify(obj3);
                try
                {

                    const response3 = await fetch('http://localhost:5000/api/getAttendingEvents',
                        {method:'POST',body:js3,headers:{'Content-Type': 'application/json'}});

                    var res3 = JSON.parse(await response3.text());
                    console.log(res3);
                    localStorage.setItem('attending_events', JSON.stringify(res3.results));
                    var obj4 = {college:user.college, attend:res3.results};
                    var js4 = JSON.stringify(obj4);
                    const response4 = await fetch('http://localhost:5000/api/getEvents',
                        {method:'POST',body:js4,headers:{'Content-Type': 'application/json'}});

                    var res4 = JSON.parse(await response4.text());
                    console.log(res4);
                    localStorage.setItem('public_events', JSON.stringify(res4.public));
                    localStorage.setItem('private_events', JSON.stringify(res4.private));

                    window.location.href = "/home";
                }
                catch(e)
                {
                    alert(e.toString());
                    return;
                }  
                if(res.Status === "Super Admin")
                {
                    var obj5 = {user:loginUserName.value, accepted:false};
                    var js5 = JSON.stringify(obj5);
                    console.log(obj5);
                    try
                    {    
                        const response5 = await fetch('http://localhost:5000/api/getPendingEvents',
                            {method:'POST',body:js5,headers:{'Content-Type': 'application/json'}});

                        var res5 = JSON.parse(await response5.text());
                        localStorage.setItem('events_to_approve', JSON.stringify(res5.results));
                        console.log(res5);
                        console.log("^^^^");
                        
                    }
                    catch(e)
                    {
                        // alert(e.toString());
                        return;
                    }
                    
                }
                else if(res.Status === "Admin")
                {
                    var obj2 = {user:loginUserName.value,approved:false,members:3,college:res.College};
                    var js2 = JSON.stringify(obj2);
                    console.log(obj2);
                    try
                    {    
                        const response2 = await fetch('http://localhost:5000/api/getAdminRSO',
                            {method:'POST',body:js2,headers:{'Content-Type': 'application/json'}});

                        var res2 = JSON.parse(await response2.text());
                        localStorage.setItem('approve_rso', JSON.stringify(res2));
                        
                    }
                    catch(e)
                    {
                        // alert(e.toString());
                        return;
                    }
                    
                }
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
        <Form className="loginform">
            <h3 className="loginlabel">
                Log In
            </h3>
            <Form.Group controlId="formBasicEmail">
                <Form.Control className="login-input" type="name" placeholder="username" ref={(c) => loginUserName = c}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Control className="login-input" type="password" placeholder="password" ref={(c) => loginPassword = c}/>
            </Form.Group>
            <Button className="login-button" size="lg" variant="primary" type="submit" onClick={doLogin} block>
                Log in
            </Button>
            <div className="col text-center">
            <span id="loginResult">{message}</span>
            </div>
            <hr></hr>
            <div className="col text-center">
                {/* <a href="/ForgotPassword">Forgot Password?</a><br></br> */}
                {/* <span className="divider"></span> */}
                <a href="/register" className="link">Create an account</a>
            </div>
        </Form>
        
    </div>
    );
};

export default Login;