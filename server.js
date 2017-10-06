//*****1. require express********
// Load the express module that we install using npm
var express = require("express");
var app = express();
//require mongoose
var mongoose = require('mongoose');

//***PARSE DATA*****
// require body-parser
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
// our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/basic_mongoose'); //basic_mongoose is the name of my db

//create schema
var UserSchema = new mongoose.Schema({
 name: String,
 age: Number
})
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'

//**** 2. create routes ********
app.get('/', function(request, response) {
  User.find({}, function(err, users) {
  if(err) {
    console.log(err);
    response.render('index')
  } else {
    console.log("This all users", users);
    response.render('index', {users_info: users})
  }
})
  console.log("its working");
});

//****POST ROUTE*****
// route to process new user form data:
app.post('/users', function (req, res){
  console.log("POST DATA ", req.body.name, req.body.age)
  console.log("POST DATA ", req.body);
  // create a new User with the name and age corresponding to those from req.body
  var user = new User({name: req.body.name, age: req.body.age});
  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
  user.save(function(err) {
    // if there is an error console.log that something went wrong!
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added a user!');
      //redirect the user back to the root route.
      res.redirect('/')
    }
  })
});

//******3 Call the listen function
// Tell the express app to listen on port 8000
app.listen(8000, function() {
  console.log("listening on port 8000");
})
