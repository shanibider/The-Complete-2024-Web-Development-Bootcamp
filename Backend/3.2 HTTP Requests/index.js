/* HTTP- language that allows computer to talk to each others across the internet.
Request Vocabulary:
- GET: retrieve information 
- POST: send information 
- PUT: replace reasource with new information
- PATCH: patch up (fix) a resource 
- DELETE: delete existing information of the specified source
*/

//Work plan- npm init -y, npm i express, write server including "/", "/contact", "about" endopints, nodemon index.js.
import express from "express";
const app = express();
const port = 3000;


// client makes a request to the server, and the server sends a response back to the client.
// the client ask for a reaource- the homepage

// GET request to the homepage
app.get("/", (req, res) => {
  // Server sends a response back to the client (in advance, we will use a template engine to send back an ejs/ html file)
  res.send("<h1>Hello</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>About Me</h1><p>My name is Shani</p>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>Contact Me</h1><p>Phone: +44123456789</p>");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
