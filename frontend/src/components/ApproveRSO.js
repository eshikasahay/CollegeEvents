
import React, { useState } from 'react';
import { Form,Button, InputGroup, FormControl } from 'react-bootstrap';

function ApproveRSO()
{
    var title;
    var college;
    var description;
    var admin;
    const [message,setMessage] = useState('');
    var user = JSON.parse(localStorage.getItem("user_data"));
    var rso_to_approve = JSON.parse(localStorage.getItem("rso_to_approve"));
    var rso_pos = -1;

    const divStyle = {
        width: '90%',
      };

    const doApprove = async event => 
    {
        event.preventDefault();
        var error = [];
        var p = parseInt(event.target.id);
        var obj2 = {title:rso_to_approve.results[p].Title};
        var js2 = JSON.stringify(obj2);

        try
        {    
            const response2 = await fetch('http://localhost:5000/api/approveRSO',
                {method:'POST',body:js2,headers:{'Content-Type': 'application/json'}});

            var res2 = JSON.parse(await response2.text());
            setMessage("RSO has been Approved");
            //reset rso_to_approve
            if(user.status === "Admin")
                {
                    var obj = {user:user.userName,approved:false,members:3};
                    var js = JSON.stringify(obj);

                    try
                    {    
                        const response = await fetch('http://localhost:5000/api/getAdminRSO',
                            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

                        var res = JSON.parse(await response.text());
                        localStorage.setItem('rso_to_approve', JSON.stringify(res));
                        
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
          {rso_to_approve.results.map(function(item) {
            rso_pos++
            
            return (<div className="card">
              <img src="img_avatar.png" alt="Avatar" style={divStyle} />
              <div className="container">
                <h4><b>Organization: {item.Title}</b></h4>
                <h6>College: {item.College}&nbsp;&nbsp;|&nbsp;&nbsp;Total Members: {item.Total}</h6>
                <p>{item.Description}</p>
                <Button id={rso_pos} onClick={doApprove}>Approve</Button>
                <div className="approve">{message}</div>
              </div>
            </div>)
          })}
        </div>
      </div>
    );
};

export default ApproveRSO;