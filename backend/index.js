var http = require('http');
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const Register = require('./routes/register');
const Login = require('./routes/login');
const Contact = require('./routes/contact');
const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const config = require('config');

// app.use(cors({
//     origin: ['http://localhost:4200'],
//     credentials: true
// }));

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtprivateKey is not defined');
    process.exit(1);
}

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/register',Register);
app.use('/login', Login);
app.use('/contact', Contact);


app.use((req , res , next)=>{

   res.setHeader(
     "Authorization"
   );
});



 mongoose.connect('mongodb://localhost/noton')
.then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));


const port = 8000;

app.listen(port, () => console.log(`Listening on port ${port}...`));

