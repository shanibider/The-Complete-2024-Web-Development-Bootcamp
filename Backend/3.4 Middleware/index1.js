import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  console.log(__dirname + "/public/index.html");  // we will get: C:\Users\shani\OneDrive\שולחן העבודה\Web Development Projects\Web-Development-Projects\backend\3.4 Middleware/public/index.html
  // here i dont just send html, i send the file i linked
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  console.log(req.body);
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});







/* Working with Express Middleware-
Middleware is a function that runs between the request and the response.
It can be used for a variety of things, such as logging, authentication, and more.
Middleware functions can be used with the app.use() method.

Work plan for this code-
1. npm i body-parser
2. nodemon index.js
3. import bodyParser from "body-parser";
4. app.use(bodyParser.urlencoded({ extended: true }));
5. app.post("/submit", (req, res) => {
  console.log(req.body);
});
6. <form action="/submit" method="post">


*/
