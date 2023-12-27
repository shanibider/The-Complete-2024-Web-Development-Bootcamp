// Making all range of requests- GET, POST, PUT, PATCH and DELETE API requests using axios. With bearer token authentication.

/* i saw how to make a GET request using axios in the previous project.
to this request i can chain a .then() method to handle the response and a .catch() method to handle the error or .finally.
axios.get ("URL", {
         params: {        //here we can use params/auth/data/headers (config)
             score: 5,
             apiKey: "abc",
           },
         });
 */

import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/

//TODO 1: Add your own bearer token from the previous lesson.
const yourBearerToken = "ed1caba6-ea18-4cc4-a719-ced667576b14";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));   

// get request to the root route
app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

// axios get request 
app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;   // id is "idInput" in index.ejs
  try {
    // GET /secrets/{id} - Returns the secret with the specified ID. Bearer token authentication is required.
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });``
  }   
  catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

// axios post request
app.post("/post-secret", async (req, res) => {

  // TODO 2: Use axios to POST the data from req.body to the secrets api servers.
  // req.body is all that inside <form> in index.ejs
  try {
  // POST /secrets - Adds a new secret. 
  const result = await axios.post (API_URL + "/secrets/", req.body, config);
  res.render("index.ejs", { content: JSON.stringify(result.data) });
}  
catch (error) {
  res.render("index.ejs", { content: JSON.stringify(error.response.data) });
}
});



// put request provides all the data it wants to update
app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;

  // TODO 3: Use axios to PUT the data from req.body to the secrets api servers.  
  // PUT /secrets/{id} - Updates the content of the secret with the specified ID.
  try {
    const result = await axios.put(
      API_URL + "/secrets/" + searchId,
      req.body,
      config
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});


// patch- provide any data you want to update
app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.
  // PATCH /secrets/{id} - Partially updates the content of the secret with the specified ID.
  try {
    const result = await axios.patch(
      API_URL + "/secrets/" + searchId,
      req.body,
      config
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});


// takes only 2 parameters- url and config (as js object)
app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 5: Use axios to DELETE the item with searchId from the secrets api servers.
  // DELETE /secrets/{id} - Deletes the secret with the specified ID.
  try {
    const result = await axios.delete(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


