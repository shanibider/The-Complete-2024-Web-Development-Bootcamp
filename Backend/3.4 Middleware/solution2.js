import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;
// morgan is a middleware that logs the request to the console
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
