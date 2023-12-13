import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  console.log(__dirname + "/public/index.html");  // we will get: C:\Users\shani\OneDrive\שולחן העבודה\Web Development Projects\Web-Development-Projects\backend\3.4 Middleware/public/index.html
  // here i dont just send html, i send inite file i link
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
