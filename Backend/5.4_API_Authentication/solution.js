// using diffrent endpoints of the API with diffrent authentication methods, using my server including 

import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// TODO: Replace the values below with your own before running this file.
const yourUsername = "shanib";
const yourPassword = "123";
const yourAPIKey = "59db4d87-5a60-411d-8818-28e806bc673e";
const yourBearerToken = "2c0f045e-716d-4031-b5c6-9a5a247eafd9";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

// will get me a random secret
app.get("/noAuth", async (req, res) => {
  try {
    // using Axios to make a GET request to the API
    const result = await axios.get(API_URL + "/random");
    res.render("index.ejs", { content: JSON.stringify(result.data) });  //  pass the data to the index.ejs with JSON.stringify to convert it to a simple string instead of an javaScript object
  } catch (error) {
    res.status(404).send(error.message);
  }
});


// will get me '/all' path ( all secrets from page 2)
app.get("/basicAuth", async (req, res) => {
  try {
    const result = await axios.get(
      API_URL + "/all?page=2",
      {
        auth: {
          username: yourUsername,
          password: yourPassword,
        },
      }
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});


// will get me '/filter' path 
app.get("/apiKey", async (req, res) => {
  try {
    // in Axios we can pass the query parameters as an object to the params property as well as write them in the URL
    const result = await axios.get(API_URL + "/filter", {
      params: {
        score: 5,
        apiKey: yourAPIKey,
      },
    });

    /* axios.get ("URL", {
         params: {        //here we can use params/auth/data/headers
             score: 5,
             apiKey: "abc",
           },
         });

    */
        
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};


// will get me '/secrets/{id}' path, secret with particular id
app.get("/bearerToken", async (req, res) => {
  try {
    // passing the config object as the third argument to the get method, to provide parameters to the headers property, putting authorization as key, and the token as value
    const result = await axios.get(API_URL + "/secrets/2", config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
