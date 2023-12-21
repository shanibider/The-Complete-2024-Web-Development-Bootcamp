import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;


app.use(express.static("public"));
// body-parser middleware set up
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when ia user visits the home page,
//   it shows a random activity.
//   You will need to check the format of the JSON data from
//   response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    console.log("Response object: ", response);   // response is an object including lots of info includint the data (object with the activity info)
    const result = response.data;         // extract the data from the response object
    console.log("Result (random activity): ", result);

    res.render("index.ejs", { data: result });
 
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  // Step 2: Play around with the drop downs and see what gets logged.
  // Use axios to make an API request to the /filter endpoint. 
  // Making sure you're passing both the type and participants queries.
  // Render the index.ejs file with a single *random* activity that comes back
  // from the API request.
  // Step 3: If you get a 404 error (resource not found) from the API request.
  // Pass an error to the index.ejs to tell the user:
  // "No activities that match your criteria."
  try {
    console.log("req.body:", req.body);
    const type = req.body.type;
    const participants = req.body.participants;
    // important to put ` ` around the url (and not " or ')
    const response = await axios.get (`https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`);
    const result = response.data;
    console.log("Result of post request (by user choice): ", result);

    res.render ("index.ejs", { data: result [Math.floor(Math.random() * result.length)] ,});  // random activity from the array of activities that match the criteria
 

  } catch (error) {
    console.error("Failed to make request:", error.message);    //log with , not +
    res.render("index.ejs", {
      error:  "No activities that match your criteria.",
    });
  }
});




app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
