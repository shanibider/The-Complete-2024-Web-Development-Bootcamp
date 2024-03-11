import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth (from postman from txt file)
const yourUsername = "shanib";
const yourPassword = "123";
const yourAPIKey = "59db4d87-5a60-411d-8818-28e806bc673e";
const yourBearerToken = "2c0f045e-716d-4031-b5c6-9a5a247eafd9";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  const result = axios.get (API_URL + "/random");     // axios get request 
  res.render("index.ejs", { content: JSON.stringify(result.data) });
  //using JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  const result = axios.get (API_URL + "/all?page=2", {}, {        // axios get request of basic auth
    auth: {
      username: yourUsername,
      password: yourPassword,
    },
  });
  res.render("index.ejs", { content: JSON.stringify(result.data) }); 
  // This is how to use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});



app.get("/apiKey", (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  const result = axios.get (API_URL + "/filter", {      // axios get request with api authorazition
    params: {
      score: 5,
      apiKey: yourAPIKey,
    },
  });
  
  res.render("index.ejs", { content: JSON.stringify(result.data) });
});



app.get("/bearerToken", (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  const result = axios.get (API_URL + "/secrets/42", {      // axios get request with bearer token auth
    headers: {
      Authorization: `Bearer ${yourBearerToken}`,
    },
  } );
  //This is how to use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
