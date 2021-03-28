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

    const { title, college, description, username, members, total} = req.body;
    var mem = [];
    mem[0] = members;
    const rso = {
        Title: title,
        College: college,
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