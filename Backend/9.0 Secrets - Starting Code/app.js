//jshint esversion:6
/*
for project starter:
npm init -y
npm i express body-parser ejs moongose

i will use the lowest level of security- email and password, using moonsgoose and mongoDB
*/

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const mongoose = require("mongoose");
/*
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
*/

const app = express();


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));


// mongoose connection
// for connection to this server we run on terminal: mongod, ctrl+c to stop, and nodemon app.js 
mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

// user DB
const userSchema = {
  email: String,
  password: String
};

const User = new mongoose.model("User", userSchema);        // now we have a collection called users, and we can start adding users




app.get ("/", function (req,res){

    res.render("home");
});


app.get ("/login", function (req,res){

    res.render("login");
});


app.get ("/register", function (req,res){

    res.render("register");
});



//catch POST request from ejs, and create new user based on the email and password entered
app.post ("/register", function (req,res){

    const newUser = new User({          // use User model to create a new user
        email: req.body.username,
        password: req.body.password
    });

    newUser.save (function (err){
    // in callback functionchecking for errors and if not, redirecting to secrets page
    if (err){
        console.log(err);
    }  else {
        // we only render the secrets page, when the user logns in
        res.render("secrets");   
     }
    });


});













app.listen(3000, function (){
    console.log("Server started on port 3000.");
});