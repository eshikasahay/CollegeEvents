import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function EditComment()
{

  var comment, rating;  
  const [message,setMessage] = useState('');
  var user = JSON.parse(localStorage.getItem("user_data"));
  var edit = JSON.parse(localStorage.getItem("editComment"));
  console.log(edit);
//   var other_rso = JSON.parse(localStorage.getItem("other_rso"));
//   var joined_rso = JSON.parse(localStorage.getItem("joined_rso"));

    const divStyle = {
        width: '90%',
      };

    const editComment = async event =>
    {
        event.preventDefault();
        if(comment.value === "" || rating.value === "Rating...")
        {
            setMessage("Fill out all fields");
            return;
        }
        var obj2 = {before:edit, newcomment:comment.value, newrating:rating.value};
        console.log(obj2);
        var js2 = JSON.stringify(obj2);

        try
        {    
            const response2 = await fetch('http://localhost:5000/api/editComment',
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
          <h2 className="text col text-center"><b>{edit.Name}: Discussion</b></h2>
            <br></br>
            <div className="container">
            <div className="card">
            <Form className="collsize">
                <div className="text col text-center">
                     <br></br>
                    <h3><b>Edit a Comment</b></h3>
                </div>
                <br></br>
                <Form.Group controlId="formBasicFirst">
                 <Form.Control className="login-input" type="fname" defaultValue={edit.Comment.Comment} ref={(c) => comment = c}/>
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
                <Button onClick={editComment}> &nbsp;&nbsp;Edit&nbsp;&nbsp; </Button><br></br>
                <span>{message}</span>
                <br></br>
                <br></br>
             </Form>
            </div>
            </div>
        
    </div>
    );
};

export default EditComment;