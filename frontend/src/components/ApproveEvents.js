
import React, { useState } from 'react';
import { Form,Button, InputGroup, FormControl } from 'react-bootstrap';

function ApproveEvents()
{
    var title;
    var college;
    var description;
    var admin;
    const [message,setMessage] = useState('');
    var user = JSON.parse(localStorage.getItem("user_data"));
    var events_to_approve = JSON.parse(localStorage.getItem("events_to_approve"));
    console.log(events_to_approve);
    var event_pos = -1;

    const divStyle = {
        width: '90%',
      };

    const doApprove = async event => 
    {
        event.preventDefault();
        var error = [];
        var p = parseInt(event.target.id);
        var obj2 = {name:events_to_approve[p].Name,type:events_to_approve[p].Type};
        console.log(events_to_approve[p].Name)
        var js2 = JSON.stringify(obj2);

        try
        {    
            const response2 = await fetch('http://localhost:5000/api/approveEvent',
                {method:'POST',body:js2,headers:{'Content-Type': 'application/json'}});

            var res2 = JSON.parse(await response2.text());
            // setMessage("Event has been Approved");
            //reset event_to_approve
            if(user.status === "Super Admin")
                {
                    var obj = {user:user.userName,accepted:false};
                    var js = JSON.stringify(obj);

                    try
                    {    
                        const response = await fetch('http://localhost:5000/api/getPendingEvents',
                            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

                        var res = JSON.parse(await response.text());
                        localStorage.setItem('events_to_approve', JSON.stringify(res.results));
                        window.location.href = "/approveEvents";
                    }
                    catch(e)
                    {
                        alert(e.toString());
                        return;
                    }
                    
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
          <br></br>
          <h2 className="text col text-center"><b>Pending Approvals</b></h2>
        <br></br>
        <div className="container">
          {events_to_approve.map(function(item) {
            event_pos++
            
            return (<div className="card">
              <img src="img_avatar.png" alt="Avatar" style={divStyle} />
              <div className="container">
                <h4><b>{item.Type}: {item.Name}</b></h4>
                <h6>College: {item.College}&nbsp;&nbsp;|&nbsp;&nbsp;Date: {item.Date}&nbsp;&nbsp;|&nbsp;&nbsp;Time: {item.Time}&nbsp;&nbsp;|&nbsp;&nbsp;Created By: {item.Admin}</h6>
                <p>About: {item.Description}</p>
                {/* <p><b>Created By: {item.Admin}</b></p> */}
                <Button id={event_pos} onClick={doApprove}>Approve</Button>
                <div className="approve">{message}</div>
              </div>
            </div>)
          })}
        </div>
      </div>
    );
};

export default ApproveEvents;