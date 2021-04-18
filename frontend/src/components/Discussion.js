
import React, { useState } from 'react';
import { Form,Button, InputGroup, FormControl } from 'react-bootstrap';

function Discussion()
{
    var comment;
    var rating;
    var description;
    var admin;
    const [message,setMessage] = useState('');
    var user = JSON.parse(localStorage.getItem("user_data"));
    var discussion = JSON.parse(localStorage.getItem("discussion"));
    console.log(discussion);
    var event_pos = -1;

    const divStyle = {
        width: '90%',
      };

    const addComment = async event =>
    {
        event.preventDefault();
        if(comment.value === "" || rating.value === "Rating...")
        {
            setMessage("Fill out all fields");
            return;
        }
        var obj2 = {user:user,name:discussion.Name,comment:comment.value,rating:rating.value};
        console.log(obj2);
        var js2 = JSON.stringify(obj2);

        try
        {    
            const response2 = await fetch('http://localhost:5000/api/addComment',
                {method:'POST',body:js2,headers:{'Content-Type': 'application/json'}});

            var res2 = JSON.parse(await response2.text());
            setMessage("");
            // var d = {Name:res2.result.Name, Comments:res2.result.Comments};
            localStorage.setItem('discussion', JSON.stringify(res2.result[0]));
            console.log(res2.result);
            window.location.href = "/discussion";
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }

    };

    const doEdit = async event => 
    {
        event.preventDefault();
        var error = [];
        var p = parseInt(event.target.id);   
        console.log(discussion.Comments[p]); 
        var d = {Name:discussion.Name, Comment:discussion.Comments[p]};
        localStorage.setItem('editComment', JSON.stringify(d));
        window.location.href = "/editComment";
    }; 

    const doDelete = async event => 
    {
        event.preventDefault();
        var error = [];
        var p = parseInt(event.target.id); 
        console.log(discussion.Comments[p]);     
        var obj2 = {user:user,name:discussion.Name,comment:comment.value,rating:rating.value};
        console.log(obj2);
        var js2 = JSON.stringify(obj2);

        try
        {    
            const response2 = await fetch('http://localhost:5000/api/deleteComment',
                {method:'POST',body:js2,headers:{'Content-Type': 'application/json'}});

            var res2 = JSON.parse(await response2.text());
            setMessage("");
            // var d = {Name:res2.result.Name, Comments:res2.result.Comments};
            localStorage.setItem('discussion', JSON.stringify(res2.result[0]));
            console.log(res2.result);
            window.location.href = "/discussion";
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }

    }; 

    return(
      <div>
          <br></br>
          <h2 className="text col text-center"><b>{discussion.Name}: Discussion</b></h2>
            <br></br>
            <div className="container">
            <div className="card">
            <Form className="collsize">
                <div className="text col text-center">
                     <br></br>
                    <h3><b>Add a Comment</b></h3>
                </div>
                <br></br>
                <Form.Group controlId="formBasicFirst">
                 <Form.Control className="login-input" type="fname" placeholder="Comment" ref={(c) => comment = c}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                {/* <Form.Label>Example select</Form.Label> */}
                <Form.Control as="select" custom  ref={(c) => rating = c}>
                <option>Rating...</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                </Form.Control>
                </Form.Group>
                <Button onClick={addComment}> &nbsp;&nbsp;Add&nbsp;&nbsp; </Button><br></br>
                <span>{message}</span>
                <br></br>
                <br></br>
             </Form>
            </div>
            </div>
            <br></br>
            <br></br>
            <div className="container">
            {discussion.Comments.map(function(item) {
                event_pos++
                if(item.UserName === user.userName)
                {
                    return (<div className="card">
                    <div className="container">
                    <h6><i>{item.First} {item.Last}</i> gave {item.Rating} stars</h6>
                    <p> {item.Comment}</p>
                    <Button size="sm" id={event_pos} onClick={doEdit}>Edit</Button>&nbsp;&nbsp;
                    <Button size="sm" id={event_pos} variant="danger" onClick={doDelete}>Delete</Button>
                    </div>
                    </div>)
                }
                
                return (<div className="card">
                <div className="container">
                    <h6><i>{item.First} {item.Last}</i> gave {item.Rating} stars</h6>
                    <p> {item.Comment}</p>
                </div>
                </div>)
            })}
        </div>
      </div>
    );
};

export default Discussion;