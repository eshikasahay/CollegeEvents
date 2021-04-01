import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function RSO()
{
  var user = JSON.parse(localStorage.getItem("user_data"));
  const [message,setMessage] = useState('');
  var rso = JSON.parse(localStorage.getItem("user_created_rso"));
  var other_rso = JSON.parse(localStorage.getItem("other_rso"));
  var other_rso_pos = -1;
  var rso_pos = -1;
  // function createMarkup() 
  // { 
  //   // return {__html: '<div class="card"><img src="img_avatar.png" alt="Avatar" style="width:100%"><div class="container"><h4><b>{rso.results[i].Title}</b></h4><p>Architect & Engineer</p></div></div>'};
  //   var html_string = '';
  //   var length = rso.results.length;
  //   console.log(rso.results[0].Title);
  //   for(var i = 0; i<length; i++)
  //   {
  //     html_string+= `<div class="card"><img src="img_avatar.png" alt="Avatar" style="width:90%"><div class="container"><h4><b>Organization: {{rso.results[i].Title}}</b></h4><h6>College: {rso.results[i].College}</h6><p>{rso.results[i].Description}</p></div></div>`;
  //   }
  //   return {__html: html_string};
  // };
  
  const divStyle = {
    width: '90%',
  };

  const doEdit = async event => 
  {
    event.preventDefault();
    console.log(event.target.id);
  };

  const doDelete = async event => 
  {
    event.preventDefault();
    console.log(event.target.id);
  };

  const doJoin = async event => 
  {
    event.preventDefault();
    var p = parseInt(event.target.id);
    console.log(other_rso.results[p].Title);
    
    var obj = {member:user, title:other_rso.results[p].Title};
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch('http://localhost:5000/api/joinRSO',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());
            console.log(res);
            var obj3 = {user:user.userName};
          var js3 = JSON.stringify(obj3);

          try
          {    
              const response3 = await fetch('http://localhost:5000/api/getMyRso',
                  {method:'POST',body:js3,headers:{'Content-Type': 'application/json'}});

              var res3 = JSON.parse(await response3.text());
              console.log(res3);
              localStorage.setItem('user_created_rso', JSON.stringify(res3));

              var obj2 = {user:user.userName};
              var js2 = JSON.stringify(obj2);
              try
              {    
                  const response2 = await fetch('http://localhost:5000/api/otherRSOs',
                      {method:'POST',body:js2,headers:{'Content-Type': 'application/json'}});

                  var res2 = JSON.parse(await response2.text());
                  console.log(res2);
                  localStorage.setItem('other_rso', JSON.stringify(res2));
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
        <h2 className="col text-center text"><b>Registered Student Organizations</b></h2>
        <br></br>
        <br></br>
        <h4 className="text col text-center"><u><b>My RSOs</b></u></h4>
        <br></br>
        {/* <div dangerouslySetInnerHTML={createMarkup()} className="card container" /> */}
        {/* <ul> */}
        <div className="container">
          {rso.results.map(function(item) {
            rso_pos++
            if(item.Accepted === false)
            {
              return (<div className="card" key={rso_pos}>
              <img src="img_avatar.png" alt="Avatar" style={divStyle} />
              <div className="container">
                <h5 className="rso-pending">(Pending Admin Approval)</h5>
                <h4><b>Organization: {item.Title}</b></h4>
                <h6>College: {item.College}&nbsp;&nbsp;|&nbsp;&nbsp;Total Members: {item.Total}</h6>
                <p>{item.Description}</p>
                <Button id={rso_pos} onClick={doEdit}>Edit</Button>
                &nbsp;&nbsp;
                <Button variant="danger" id={rso_pos} onClick={doDelete}>Delete</Button>
              </div>
              </div>)
            }
            return (<div className="card">
              <img src="img_avatar.png" alt="Avatar" style={divStyle} />
              <div className="container">
                <h4><b>Organization: {item.Title}</b></h4>
                <h6>College: {item.College}</h6>
                <p>{item.Description}</p>
                <Button id={rso_pos} onClick={doEdit}>Edit</Button>
                &nbsp;&nbsp;
                <Button variant="danger" id={rso_pos} onClick={doDelete}>Delete</Button>
              </div>
            </div>)
          })}
        </div>
        <br></br>
        <br></br>
        <h4 className="text col text-center"><u><b>Other RSOs</b></u></h4>
        <br></br>
        {/* <div dangerouslySetInnerHTML={createMarkup()} className="card container" /> */}
        {/* <ul> */}
        <div className="container">
          {other_rso.results.map(function(item) {
            other_rso_pos++
            if(item.Accepted === false)
            {
              return (<div className="card" key={other_rso_pos}>
              <img src="img_avatar.png" alt="Avatar" style={divStyle} />
              <div className="container">
                <h5 className="rso-pending">(Pending Admin Approval)</h5>
                <h4><b>Organization: {item.Title}</b></h4>
                <h6>College: {item.College}&nbsp;&nbsp;|&nbsp;&nbsp;Total Members: {item.Total}</h6>
                <p>{item.Description}</p>
                <Button id={other_rso_pos} onClick={doJoin}>Join</Button>
              </div>
              </div>)
            }
            return (<div className="card">
              <img src="img_avatar.png" alt="Avatar" style={divStyle} />
              <div className="container">
                <h4><b>Organization: {item.Title}</b></h4>
                <h6>College: {item.College}&nbsp;&nbsp;|&nbsp;&nbsp;Total Members: {item.Total}</h6>
                <p>{item.Description}</p>
                <Button id={other_rso_pos} onClick={doJoin}>Join</Button>
              </div>
            </div>)
          })}
        </div>
        <br></br>
        <br></br>
    </div>
    );
};

export default RSO;