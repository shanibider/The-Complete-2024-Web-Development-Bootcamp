import express from "express";
const app = express();
const port = 3000;

// *********************
// Practice using Postman. Server should running with nodemon.
// Then test the 5 different routes below with Postman. Open a separate tab for each request.
// Check that for each route you’re getting the correct status code returned to you from your server.
// (shouldn't get any 404s or 500 status codes).
// *********************

/*
Postman is a tool that allows us to test our backend without needing a frontend.
We can test our routes and see what data is being sent back to us.
We test each request in postman
*/

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.post("/register", (req, res) => {
  //Do something with the data
  res.sendStatus(201);
});

app.put("/user/angela", (req, res) => {
  res.sendStatus(200);
});

app.patch("/user/angela", (req, res) => {
  res.sendStatus(200);
});

app.delete("/user/angela", (req, res) => {
  //Deleting user
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
