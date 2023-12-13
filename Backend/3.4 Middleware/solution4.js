import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var bandName = "";

//  configuring middleware in a Node.js application that uses the Express framework
//  sets up middleware to parse incoming URL-encoded data in the body of the HTTP requests handled by your Express application, and it allows for more complex data structures to be included in the URL-encoded data.
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware function to generate a band name from the submitted form data
function bandNameGenerator(req, res, next) {
  console.log(req.body); // Logging the form data to the console
  // Generating a band name by combining "street" and "pet" from the form data
  bandName = req.body["street"] + req.body["pet"];
  next(); // Calling the next middleware or route handler in the chain
}

// Applying the bandNameGenerator middleware to all routes
app.use(bandNameGenerator);

// Handling GET requests to the root ("/") route
app.get("/", (req, res) => {
  // Sending the index.html file located in the "public" directory
  res.sendFile(__dirname + "/public/index.html");
});


// Handling POST requests to the "/submit" route
app.post("/submit", (req, res) => {
  // Sending a response with the generated band name in HTML format
  res.send(`<h1>Your band name is:</h1><h2>${bandName}✌️</h2>`);
});



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
