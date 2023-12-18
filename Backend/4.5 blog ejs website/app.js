//Work plan- npm init -y, npm i express, write server including "/", "/contact", "about" endopints, nodemon app.js.
import express from "express";
import bodyParser from "body-parser"; // Middleware
import ejs from "ejs";
import _ from "lodash";
import nodemailer from "nodemailer";
import path from "path";
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js';


const homeStartingContent = "Hi Everyone.";
const aboutTitle = "About Me"; 
const contactTitle = "Contact";
const notification = "";

/*
Creating the application structure, including routes, views, and static files.
Setting up the Express.js server and defining the necessary routes.
*/

// Express.js server:
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
// Server static files
app.use(express.static("public"));

let posts = [];


// defining the necessary routes:

// the client ask for a reaource- the homepage.
app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent, 
    posts: posts, // Pass the posts array to home.ejs
    });
});

// GET ABOUT:
app.get("/about", function(req, res){
  res.render("about", {aboutTitle: aboutTitle});  // render the about page and pass the aboutContent variable to it
});

// GET contact:
app.get("/contact", function(req, res){
  res.render("contact", {contactTitle: contactTitle, notification: notification});  // render the contact page and pass the contactContent variable to it 
});


// GET and POST compose:
app.get("/compose", function(req, res){
  res.render("compose");
});
// post viewing feature- displaying all the posts on the home page
app.post("/compose", function(req, res){
    const post = {subject:req.body.postSubject, title: req.body.postTitle, content: req.body.postBody};
  posts.push(post);   //pushing the post into the posts array
  res.redirect("/");
});


// displaying a single post when the user clicks on Read More. find a post with a title matching the requested post name and then renders a template with that post (post.ejs).
// defining a route using app.get for handling GET requests to the path "/posts/:postName", The ":postName" part in the route is a route parameter, and it allows you to capture the value specified in the URL.
app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach (function (post){
    const storedTitle = _.lowerCase(post.title);    //converts to lowercase 
    if (storedTitle === requestedTitle) {     // checks if the stored title matches the requested title
            res.render("post", {subject: post.subject, title: post.title, content: post.content});    //If there is a match, it renders the "post" template, passing information about the post (subject, title, content) to be displayed.
    }
  });
});



// Edit post route - display the form to edit the post
app.get("/edit/:postName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);
    if (storedTitle === requestedTitle) {
      res.render("edit", { post: post });
    }
  });
});

// Update post route - handle the form submission to update the post
app.post("/edit/:postName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post, index) {
    const storedTitle = _.lowerCase(post.title);
    if (storedTitle === requestedTitle) {
      // Update the post with the new data
      posts[index] = { subject: req.body.postSubject, title: req.body.postTitle, content: req.body.postBody };
      res.redirect("/posts/" + _.lowerCase(req.body.postTitle));    //redirect to the post page
    }
  });
});

// Delete post route - handle post deletion
app.get("/delete/:postName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  // Filter out the post to be deleted
  posts = posts.filter(function (post) {
    return _.lowerCase(post.title) !== requestedTitle;    //return all the posts that don't match the requested title
  });

  res.redirect("/");
});



// POST request for handling the form submission
app.post("/contact", function (req, res) {
  // Extract form data
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  // Nodemailer configuration
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shanibider@gmail.com", // 
      pass: "frbl yjwk gqvd prwa", // "App Password"- generated app password (provided by gmail)
    },
  });

  // Email options
  const mailOptions = {
    from: email,
    to: "shanibider@gmail.com", 
    subject: `New Message from ${name}`,
    text: `${message} \n\n Email sent from: ${email}`,  };

  // Send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
      res.redirect("/contact?notification=Error: Unable to send the message.");      
    } else {
      console.log("Email sent: " + info.response);
    
     // Show SweetAlert for success
     const successNotification = 'Email sent successfully!';
     res.render("contact", { contactContent: contactContent, notification: successNotification });
     res.redirect("/"); // Redirect to home page

    }
  });
});




app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});