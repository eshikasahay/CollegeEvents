const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const hashPass = require('password-hash');
var ObjectId = require('mongodb').ObjectID;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://Admin:admin@cluster0.00wbn.mongodb.net/DatabaseClass?retryWrites=true&w=majority';

const client = new MongoClient(url);
client.connect();


app.post('/api/login', async (req, res, next) =>
{
    var error = '';

    const { login, password } = req.body;

    const db = client.db();

    const result = await db.collection('Users').find({
        UserName: login.toLowerCase()
    }).toArray();
    
    var fn = '';
    var ln = '';
    var email = '';
    // var valid = false;
    var usern = '';
    var status = '';

    if(result.length > 0 && hashPass.verify(password, result[0].Password))
    {
        fn = result[0].FirstName;
        ln = result[0].LastName;
        email = result[0].Email;
        // valid = result[0].Validated;
        usern = result[0].UserName;
        status = result[0].Type;
    }

    var ret = {
        firstName: fn,
        lastName: ln,
        Email: email,
        UserName: usern,
        // Validated: valid,
        Status: status,
        error: ''
    };

    res.status(200).json(ret);
});

app.post('/api/Register', async (req, res, next) =>
{
    var error = '';

    const { firstname, lastname, email, login, password, type } = req.body;
    var hashedPass = hashPass.generate(password);

    const user = {
        FirstName: firstname,
        LastName: lastname,
        Email: email,
        UserName: login.toLowerCase(),
        Password: hashedPass,
        Type: type,
        // Validated: false
    }

    try {
      const db = client.db();
      const result = await db.collection('Users').insertOne(user);

      // using Twilio SendGrid's v3 Node.js Library
      // https://github.com/sendgrid/sendgrid-nodejs
      // const sgMail = require('@sendgrid/mail')
      // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
      // const msg = {
      //   to: email, // Change to your recipient
      //   from: 'letscwhatyouknow@gmail.com', // Change to your verified sender
      //   subject: 'Please Verify Your Email!',
      //   text: 'and easy to do anywhere, even with Node.js',
      //   html: '<a href="http://localhost:3000/VerifyEmail/"<strong><button type="button">Click Me To Verify Account!</button></strong>',
      // }
      // sgMail
      //   .send(msg)
      //   .then(() => {
      //     console.log('Email sent')
      //   })
      //   .catch((error) => {
      //     console.error(error)
      //   })
    }
    catch(e) {
      error = "Email/Username already in use";
    }

    var ret = { error: error };
    res.status(200).json(ret);
});

app.post('/api/CreateRso', async (req, res, next) =>
{
    var error = '';

    const { title, college, admin, description, username, members, total} = req.body;
    var mem = [];
    mem[0] = members;
    const rso = {
        Title: title,
        College: college,
        Admin: admin,
        Description: description,
        CreatedBy: username,
        Members: mem,
        Total: total,
        Accepted: false
    }

    try {
      const db = client.db();
      const result = await db.collection('RSO').insertOne(rso);
    }
    catch(e) {
      error = "Cannot Request";
    }

    var ret = { error: error };
    res.status(200).json(ret);
});

app.post('/api/getMyRso', async (req, res, next) =>
{
    var error = '';

    const {user} = req.body;
    // console.log(user);
    var arr = [];
    var _ret = [];
    var results = [];
    var results2 = [];
    try{
      const db = client.db();
      results = await db.collection('RSO').find({CreatedBy:user}).toArray();
      // console.log(results);
      var length = results.length;
      for(var i=0; i<length; i++)
      {
        _ret.push(results[i]);
      }
      // if(length<numQuestionsToSend)
      // {
      //   error.push("Not enough questions");
      // }
      // else
      // {
      //   var rand;
      //   for(var i=0; i<numQuestionsToSend; i++)
      //   {
      //     rand = Math.floor(Math.random() * Math.floor(length));
      //     while(arr.indexOf(rand) != -1)
      //     {
      //       rand = Math.floor(Math.random() * Math.floor(length));
      //     }
      //     arr.push(rand);
      //     _ret.push(results[rand]);
      //   }
        
      // }
    }
    catch(e){
      error=e.toString();
    }
    
    var ret = { results: results, error: error };
    res.status(200).json(ret);
});

app.post('/api/searchAdmin', async (req, res, next) =>
{
    var error = [];
    const { username } = req.body;
    var _ret = 0;
    
    try{
      const db = client.db();
      const results = await db.collection('Users').find({
          UserName: username,
          Type: "Admin"
      }).toArray();
      var length = results.length;
      
      if(length <= 0)
      {
        error.push("Admin does not exist");
      }
      else
      {
        _ret = 1;
      }
    }
    // }
    catch(e){
      error=e.toString();
    }
    
    var ret = { results: _ret, error: error };
    res.status(200).json(ret);
});

app.post('/api/otherRSOs', async (req, res, next) =>
{
    var error = [];
    const { user } = req.body;
    var _ret = [];
    var results = [];
    var flag = 0;
    try{
      const db = client.db();
      results = await db.collection('RSO').find({ CreatedBy: { $ne: user } }).toArray();
      // console.log(results);
      var length = results.length;
      for(var i=0; i<length; i++)
      {
        flag = 0;
        var memLength = results[i].Members.length;
        for(var j=0; j<memLength; j++)
        {
          if(results[i].Members[j].userName === user)
          {
            flag = 1;
            break;
          }
        }
        if(!flag)
        {
          _ret.push(results[i]);
        }
        
      }
      
    }
    catch(e){
      error=e.toString();
    }
    
    var ret = { results: _ret, error: error };
    res.status(200).json(ret);
});

app.post('/api/joinRSO', async (req, res, next) =>
{
    var error = [];
    var flag = 0;
    const { member, title } = req.body;
    var _ret = [];
    var results = [];
    var length;

    try{
      const db = client.db();
      results = await db.collection('RSO').find({ Title: title }).toArray();
      length = results[0].Members.length;
      for(var i=0; i<length; i++)
      {
        _ret.push(results[0].Members[i]);
      }
      // console.log(!_ret.includes(member));
      for(var i=0; i<length; i++)
      {
        if(_ret[i].userName === member.userName)
        {
          flag = 1;
          break;
        }
      }
      console.log(flag);
      if(!flag)
      {
        _ret.push(member);
        console.log(_ret);
        var query = 
        { 
            Title: title
        };
        
        var newValues = 
        {
            $set:
            {
              Members : _ret,
              Total : length+1
            }
        };
  
        var result = await db.collection('RSO').updateOne(query,newValues);
        flag = true;
        const user = {
          Title: title,
          College: results[0].College,
          Description: results[0].Description,
          Member: member.userName,
          Total: length+1,
          Accepted: results[0].Accepted,
        }
        const resultss = await db.collection('JoinedRSO').insertOne(user);
        
        newValues = 
        {
            $set:
            {
              Total : length+1
            }
        };
  
        var result = await db.collection('JoinedRSO').updateOne(query,newValues);
      }
    
    }
    catch(e){
      error=e.toString();
    }
    
    var ret = { results: results, error: error, existing:flag };
    res.status(200).json(ret);
});

app.post('/api/leaveRSO', async (req, res, next) =>
{
    var error = [];
    var flag = 0;
    const { member, title } = req.body;
    var _ret = [];
    var results = [];
    var length;

    try{
      const db = client.db();
      results = await db.collection('RSO').find({ Title: title }).toArray();
      length = results[0].Members.length;
      for(var i=0; i<length; i++)
      {
        if(results[0].Members[i].userName !== member.userName)
        {
          _ret.push(results[0].Members[i]);
        }
      }
        console.log(_ret);
        var query = 
        { 
            Title: title
        };
        
        var newValues = 
        {
            $set:
            {
              Members : _ret,
              Total : length-1
            }
        };
  
        var result = await db.collection('RSO').updateOne(query,newValues);
        // flag = true;
        // const user = {
        //   Title: title,
        //   College: results[0].College,
        //   Description: results[0].Description,
        //   Member: member.userName,
        //   Total: length+1,
        //   Accepted: results[0].Accepted,
        // }
        // const resultss = await db.collection('JoinedRSO').insertOne(user);
        
        // newValues = 
        // {
        //     $set:
        //     {
        //       Total : length+1
        //     }
        // };
  
        var result2 = await db.collection('JoinedRSO').deleteOne({Title: title, Member: member.userName});
    
    }
    catch(e){
      error=e.toString();
    }
    
    var ret = { results: results, error: error };
    res.status(200).json(ret);
});

app.post('/api/getAdminRSO', async (req, res, next) =>
{
    var error = '';

    const {user, approved, members} = req.body;
    // console.log(user);
    var arr = [];
    var _ret = [];
    var results = [];
    try{
      const db = client.db();
      results = await db.collection('RSO').find({Admin:user, Accepted:approved, Total:{ $gt: members }}).toArray();
      console.log(results);
    }
    catch(e){
      error=e.toString();
    }
    
    var ret = { results: results, error: error };
    res.status(200).json(ret);
});

app.post('/api/getJoinedRSO', async (req, res, next) =>
{
    var error = '';

    const {user} = req.body;
    // console.log(user);
    var arr = [];
    var _ret = [];
    var results = [];
    var results2 = [];
    try{
      const db = client.db();
      results = await db.collection('JoinedRSO').find({Member:user}).toArray();
      // console.log(results);
      var length = results.length;
      for(var i=0; i<length; i++)
      {
        _ret.push(results[i]);
      }
    
    }
    catch(e){
      error=e.toString();
    }
    
    var ret = { results: results, error: error };
    res.status(200).json(ret);
});

app.post('/api/approveRSO', async (req, res, next) =>
{
    var error = '';

    const {title} = req.body;
    var results = [];

    try{
      const db = client.db();
      var query = 
      { 
          Title: title
      };
      
      var newValues = 
      {
          $set:
          {
            Accepted : true
          }
      };

      results = await db.collection('RSO').updateOne(query,newValues);
      console.log(results);
    }
    catch(e){
      error=e.toString();
    }
    
    var ret = { results: results, error: error };
    res.status(200).json(ret);
});

app.post('/api/deleteRSO', async (req, res, next) =>
{
    var error = '';

    const {title} = req.body;
    var results = [];

    try{
      const db = client.db();
      results = await db.collection('RSO').deleteOne({Title: title});
      results = await db.collection('JoinedRSO').deleteMany({Title:title});
    }
    catch(e){
      error=e.toString();
    }
    
    var ret = { results: results, error: error };
    res.status(200).json(ret);
});

// app.post('/api/editRSO', async (req, res, next) =>
// {
//     var error = '';

//     const {title, newTitle, newCollege, newAdmin, newDesc} = req.body;
//     var results = [];
//     var result = [];
//     try{
//       const db = client.db();

//       var query = 
//       { 
//           Title: title
//       };
      
//       var newValues = 
//       {
//           $set:
//           {
//             Title: newTitle,
//             College: newCollege,
//             Admin: newAdmin,
//             Description: newDesc
//           }
//       };

//       results = await db.collection('RSO').updateOne(query,newValues);
//       console.log(results);
//       query = 
//       { 
//           Title: title
//       };
      
//       newValues = 
//       {
//           $set:
//           {
//             Title: newTitle,
//             College: newCollege,
//             Description: newDesc
//           }
//       };

//       result = await db.collection('JoinedRSO').updateOne(query,newValues);
//     }
//     catch(e){
//       error=e.toString();
//     }
    
//     var ret = { results: results, error: error };
//     res.status(200).json(ret);
// });

app.post('/api/CreateCollege', async (req, res, next) =>
{
    var error = '';

    const { name, total, description, lat, lng, sadmin} = req.body;
    
    const college = {
        Name: name,
        Total: total,
        Description: description,
        Latitude: lat,
        Longitude: lng,
        SuperAdmin: sadmin
    }

    try {
      const db = client.db();
      const result = await db.collection('University').insertOne(college);
    }
    catch(e) {
      error = "Cannot Request";
    }

    var ret = { error: error };
    res.status(200).json(ret);
});

app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.listen(5000); // start Node + Express server on port 5000