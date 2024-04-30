/* BASIC SERVER AND CLIENT CODE WITH COMMENTS */

//installe all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
// File Path Setup:
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));  //get the current directory name and assigns it to the __dirname

const app = express();
const port = 3000;

var userIsAuthenticated = false;

// set the Express application to have middleware to parse the request body.
app.use (bodyParser.urlencoded({extended: true}));
// or: app.use (express.urlencoded({extended: true}));

//my own middleware function
function passwordCheck(req, res, next){
    // Retrieves the password from the request body. the password is sent as part of the request body.
    const password = req.body["password"];
    console.log(req.body);      //first will print {} because the body is empty, then will print { password: 'ILoveProgramming' }
    if(password === "ILoveProgramming"){
        userIsAuthenticated = true;
    }
    next();     //aloows the folw. (Calls the next function to pass control to the next middleware in the stack).
}

// Integrates the middleware into your Express application. This means that every incoming request will pass through this middleware, and it will execute the authentication logic before moving to the next middleware or route handler.
app.use(passwordCheck);

//client ask for home page, server sends home page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

//client sends data to server, server sends data back
//the form is submitted to "/check" using POST method, so i have to handle that in my server if i want anything to happen.
app.post("/check", (req, res) => {
    // when it comes through, i check if was that request coming from a user that authenticated? if so, i send the secret page.
    if (userIsAuthenticated){
        res.sendFile(__dirname + "/public/secret.html");
    }
    else
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
}); 




/*
In Express.js, req.body is a property of the request object (req) that contains the parsed request body. When a client sends data to the server, such as form data or JSON, the request body holds that data. However, by default, Express does not parse the request body, so you need to use middleware to enable this functionality.
To access req.body, you typically need to use middleware that parses the incoming request body. Here's a common example using the express.json() middleware for JSON data and express.urlencoded() for URL-encoded data:

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


With this middleware in place, when a client sends a request with JSON data/ URL-encoded data,
req.body will be populated with the parsed content.
For example, if you have a POST request with a JSON payload like this:
{
  "username": "john_doe",
  "password": "secretpassword"
}

You can access the values in your route handling code like this:
app.post('/example', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
});
*/