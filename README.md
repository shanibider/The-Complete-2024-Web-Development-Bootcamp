# Full-Stack Web Development Hub! 🚀
[![My Skills](https://skillicons.dev/icons?i=js,react,html,css,bootstrap,nodejs,express,jquery,mongodb,mysql,postman,postgresql)](https://skillicons.dev)

#### 🚀 Explore the websites I've developed across various technologies:

> Please be patient, some of these websites may take up to one minute to render due to the deployment process.

### Backend Projects:
- ✉️ [Mailchimp API Email Signup](https://nodejs-express-mailchimp-api-signup.onrender.com/) 
- 🔒 [Secrets Generator](https://api-secrets-generator.onrender.com/) 
- 🔐 [API Authentication](https://api-authentication-qpgd.onrender.com/) 
- 🎲 [Random Activity Generator](https://random-activity-generator-e0hw.onrender.com/) 
- 🌮 [API Taco Recipes](https://api-taco-recipes.onrender.com/) 
- 🎵 [Band Generator](https://band-generator-vbim.onrender.com/) 

### Frontend Projects:
- 🌐 [Basic Bootstrap Website](https://shanibider.github.io/HTML-CSS-Fitness-Website/)
- 🐕 [Tindog](https://the-complete-2024-web-development.onrender.com/)
- 🎯 [Simon Game](https://simon-game-dzc6.onrender.com/)
- 🏠 [My Personal Website](https://shanibider.github.io/Frontend-My-site/)
- 🥁 [Drum Kit](https://drum-kit-i2ts.onrender.com/)
- 🎲 [Dice Challenge](https://dicee-challenge.onrender.com/)
- 📄 [HTML Only Online Resume](https://shanibider.github.io/Online-resume/) 



### Web Design - UI/UX experience - 
3 page hotel website design via Canva:
- 🌟 [A Hotel](https://www.canva.com/design/DAFHf-h6aQs/Dsa0hvsbGzIJULqam9Fsow/view?website#4)

<br>

---


🎓 I've completed a 62-hour Udemy course covering a range of technologies including: **JavaScript, React.js, HTML5, CSS3, Bootstrap, Node.js, Express.js, APIs, EJS, SQL, PostgreSQL, Deployment, Authentication, and even explored Web3 and DApps.** <br>
Join me on this journey as I continue to learn and master the exciting world of web development! 💻🚀
<br>

![Udedmy certificate](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/728d02ae-d377-4e7b-8644-a40781ddf413)

![Web Dev Syllabus 1](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/1c3e0b35-f98b-463c-a9c0-e55300c9e40c)


<div align="center">
<img height=350px" src="https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/e9c7f762-3537-4fd6-bf2c-57f0fd5edf0a"> </div>
<br>

---
<br>

# 💼 My Projects:

## Backend Based Projects 📂 -

## 📁 QR code Generator - backend only -
This project utilizes the **inquirer** npm package to prompt users for input. It then employs the **qr-image** npm package to generate a QR code image based on the URL provided by the user. Finally, it utilizes the native fs node module to create a text file to store the user's input.
![qr generator](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/5e56e38d-ec92-47cf-a051-624a7473fe28)


## 📁 HTTP Requests 🌏
HTTP - language that allows computers to talk to each other across the internet.
Request Vocabulary:
- [x] GET: retrieve information 
- [x] POST: send information 
- [x] PUT: replace resources with new information
- [x] PATCH: patch up (fix) a resource 
- [x] DELETE: delete existing information of the specified source


```javascript
import express from "express";
const app = express();
const port = 3000;

// client makes a request to the server, and the server sends a response back to the client.
// The client asked for a resource - the homepage

// GET request to the homepage
app.get("/", (req, res) => {
  // Server sends a response back to the client (in future, we will use a template engine to send back an EJS/ html file)
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
```
<br>


## 📁 Postman -
### <img height=30px src="https://skillicons.dev/icons?i=postman"> Postman is a tool that allows us to test our backend without needing a frontend. We can test our routes and see what data is being sent back to us.
Test different routes, while the server running with nodemon

```javascript
import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.post("/register", (req, res) => {
  //Do something with the data
  res.sendStatus(201);
});

app.put("/user/shani", (req, res) => {
  res.sendStatus(200);
});

app.patch("/user/shani", (req, res) => {
  res.sendStatus(200);
});

app.delete("/user/shani", (req, res) => {
  //Deleting user
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
```

![Postman requests](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/15d07931-97aa-4634-945b-ee6e38e8bbab)
<br>


## 📁 Express Middleware
Middleware is a function that runs between the `request` and the `response`.
It can be used for a variety of things, such as logging, authentication, and more.
Middleware functions can be used with the `app.use()` method.

#### Work plan for this code-
1. npm i body-parser
2. nodemon index.js
3. import bodyParser from "body-parser";
4. app.use(bodyParser.urlencoded({ extended: true }));
5. app.post("/submit", (req, res) => {
  console.log(req.body);
});
6. <form action="/submit" method="post">

```javascript
import express from "express";

const app = express();
const port = 3000;

// my own middleware, call logger - that logs the request to the console

function logger(req, res, next) {
  console.log("Request Method: ", req.method);
  console.log("Request URL: ", req.url);
  next();
}

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```
<br>


#### `app.use(bodyParser.urlencoded({ extended: true }));`
```javascript
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
```
<br>



## 📁 My own Middleware
```javascript
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var userIsAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true }));

function passwordCheck(req, res, next) {
  const password = req.body["password"];
  if (password === "ILoveProgramming") {
    userIsAuthorised = true;
  }
  next();
}
app.use(passwordCheck);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if (userIsAuthorised) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
    //Alternatively res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```
<br>


## 📁 Passing data in EJS
```javascript

//index.js:
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  // this is how we get data from ejs file (similar to html)
  const numLetters = req.body["fName"].length + req.body["lName"].length;
  res.render("index.ejs", { numberOfLetters: numLetters });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

```javascript
//index.ejs:
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Name Letters</title>
</head>

<body>
  <!-- local is a way to access all the variables sent with res.render("index.ejs"), we also use ejs tags -->
  <% if (locals.letterNumber) { %>
    <h1>There are <%= letterNumber %> letters in your name.</h1>
    <% } else { %>
      <h1>Enter your name below 👇</h1>
      <% } %>
      <!-- form with destionation and method (post) -->
        <form action="/submit" method="POST">
          <input type="text" name="fName" placeholder="First name">
          <input type="text" name="lName" placeholder="Last name">
          <input type="submit" value="OK">
        </form>
</body>

</html>
```
<br>




## 📁 Formatting API requests
I can call it private API.
If I want my server to talk to someone else's server and back 
(get some data, and interact with that server) - it will be also in Request and Response, but this time it's done
via a public API. 

```javascript
// Get request sent from Frontend, and a Response request sent from the server back to Frontend:
    app.get("/", (req, res) => {
    res.render("index.ejs");
    });

    app.post("/submit", (req, res) => {
    const numLetters = req.body["fName"].length + req.body["lName"].length;
    res.render("index.ejs", {numberOfLetters: numLetters});
    });
```
<br>




## 📁 Band Generator Project (Express + ejs files) -
[13.webm](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/7aa45cd5-c145-41d4-bc0d-937dc9af4a9a)

<br>


## 📁 JSON + Express -
![13 (json, js, ejs project)](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/f3d869e6-fd17-4754-8c7b-1db984152f4c)


#### res.redirect("/") in POST route:

When the user visits the root ("/") using a GET request (e.g., by entering the site or refreshing the page),
the server sends the "index.ejs" template along with the current recipe data to the client for rendering.
When the user submits the form on the page (using the button with different values), a POST request is sent to "/recipe". The server processes this request, updates the data variable based on the user's choice, and then redirects the user back to the root ("/"). The GET route for the root ("/") is then triggered again, and the updated recipe data is sent to the client, allowing the template to be re-rendered with the new recipe information. This approach essentially uses a server-side redirect to refresh the page with the updated recipe data after the user makes a choice.

```javascript
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// JSON string containing an array of 3 recipes.
const recipeJSON =
  '[{"id": "0001","type": "taco","name": "Chicken Taco","price": 2.99,"ingredients": {"protein": {"name": "Chicken","preparation": "Grilled"},  "salsa": {"name": "Tomato Salsa","spiciness": "Medium"},  "toppings": [{"name": "Lettuce",  "quantity": "1 cup",  "ingredients": ["Iceberg Lettuce"]  },      {"name": "Cheese",  "quantity": "1/2 cup",  "ingredients": ["Cheddar Cheese", "Monterey Jack Cheese"]  },      {"name": "Guacamole",  "quantity": "2 tablespoons",  "ingredients": ["Avocado", "Lime Juice", "Salt", "Onion", "Cilantro"]  },      {"name": "Sour Cream",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream"]  }      ]    }  },{"id": "0002","type": "taco","name": "Beef Taco","price": 3.49,"ingredients": {"protein": {"name": "Beef","preparation": "Seasoned and Grilled"},  "salsa": {"name": "Salsa Verde","spiciness": "Hot"},  "toppings": [{"name": "Onions",  "quantity": "1/4 cup",  "ingredients": ["White Onion", "Red Onion"]  },      {"name": "Cilantro",  "quantity": "2 tablespoons",  "ingredients": ["Fresh Cilantro"]  },      {"name": "Queso Fresco",  "quantity": "1/4 cup",  "ingredients": ["Queso Fresco"]  }      ]    }  },{"id": "0003","type": "taco","name": "Fish Taco","price": 4.99,"ingredients": {"protein": {"name": "Fish","preparation": "Battered and Fried"},  "salsa": {"name": "Chipotle Mayo","spiciness": "Mild"},  "toppings": [{"name": "Cabbage Slaw",  "quantity": "1 cup",  "ingredients": [    "Shredded Cabbage",    "Carrot",    "Mayonnaise",    "Lime Juice",    "Salt"          ]  },      {"name": "Pico de Gallo",  "quantity": "1/2 cup",  "ingredients": ["Tomato", "Onion", "Cilantro", "Lime Juice", "Salt"]  },      {"name": "Lime Crema",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream", "Lime Juice", "Salt"]  }      ]    }  }]';

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let data;

// handle HTTP GET requests to the root ("/"), renders "index.ejs",
second parameter is an object {recipe: data},
data is a variable containing recipe information.
app.get("/", (req, res) => {
  res.render("index.ejs", { recipe: data });  
});


/* handle POST requests to "/recipe" endpoint.
uses switch to determine the choice made by the user based on 'req.body.choice'.
   index.ejs: <form action="/recipe" method="POST" class="buttons">
              <button type="submit" value="chicken" name="choice">🍗</button>
Depending on the choice, it sets the data variable with the corresponding recipe data.
*/
app.post("/recipe", (req, res) => {
  //Step 3: Write your code here to make this behave like the solution website.
  //Step 4: Add code to index.ejs to use the recieved recipe object.

// req.body.choice is the value of the button that was clicked on the form.  
switch (req.body.choice) {
  case "chicken":
    // turning the JSON string into a JS object (like unbuilt closet to built closet).
    // and depending on the user choice, we pick the item out of that json, just as if it was items in js array ([0], [1], [2]...).
    data = JSON.parse(recipeJSON)[0];   //set data, and sent over the relevant piece of data with the res.render above.
    break;
  case "beef":
    data = JSON.parse(recipeJSON)[1];
    break;
  case "fish":
    data = JSON.parse(recipeJSON)[2];
    break;
}
  res.redirect("/");  
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
```


#### index.ejs:
```javascript
<!DOCTYPE html>
<html>
<head>
  <title>Taco Recipes</title>
  <link rel="stylesheet" type="text/css" href="/styles/main.css">
</head>
<body>
  <h1>Taco Town 🌮</h1>
  <form action="/recipe" method="POST" class="buttons">
    <button type="submit" value="chicken" name="choice">🍗</button>
    <button type="submit" value="beef" name="choice">🥩</button>
    <button type="submit" value="fish" name="choice">🐟</button>
  </form>
  <div id="recipeContainer" class="hidden">
    <%if (locals.recipe) {%>
      <h2 id="recipeTitle">
        <%= recipe.name %>
      </h2>
      <h3>Ingredients:</h3>
      <ul id="ingredientsList">
        <li>
          <%= recipe.ingredients.protein.name %>, <%= recipe.ingredients.protein.preparation %>
        </li>
        <li>
          <%= recipe.ingredients.salsa.name %>
        </li>
        <% recipe.ingredients.toppings.forEach(topping=> { %>
          <li>
            <%= topping.quantity %> of <%= topping.name %>
          </li>
          <% }) %>
      </ul>
      <%} else {%>
        <h2>Pick your favourite taco ingredient 👆</h2>
        <%}%>
  </div>
</body>
</html>
```
<br>



## 📁 Axios + API (Random Activity Generator) -

```javascript
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    console.log(result);
    res.render("solution.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("solution.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const type = req.body.type;
    const participants = req.body.participants;
    const response = await axios.get(
      `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`
    );
    const result = response.data;
    console.log(result);
    res.render("solution.ejs", {
      data: result[Math.floor(Math.random() * result.length)],
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("solution.ejs", {
      error: "No activities that match your criteria.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
```


![14](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/47a33920-804b-41e0-a7a6-dae46343af6a)
##### JS Code:
![14 code](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/5ef0013d-1117-4c13-827b-5f60fd22af2d)
<br>




## 📁API Authentication -
#### Check out the application 👉🏼 [here](https://api-authentication-qpgd.onrender.com/)!   

1. noAuth
2. basicAuth
3. apiKey
4. bearerToken

- [x] 🔑 Basic authenticaion uses username and password, and base64 encoding to authenticate the user.
- [x] 🔒 Token-based auth is more secure because we get the user to use a username and password to log in, and once they get in we generate a token, to be used with the API.
  So the API doesn't get involved with the username and password, and instead it's the token that is used to interact with the API.
 - [x] 🛡️ Normally I'll see token-based auth as OAuth 2.0, which is a standard for token-based auth.
  In 3rd party apps, I'll see OAuth 2.0. for example, when I log in to a website using my google account, I'll get a token that I can use to interact with the API.  
  (so I don't have to give my username and password of google to the 3rd party app, instead, I give them a token, and they use that token to interact with the API.)

### 📄 SECRETS API DOCUMENTATION -
I practiced it with this API: `https://secrets-api.appbrewery.com/`

#### Authentication + REST API-
- [ ] 🔑 `Basic Authentication` is required for some endpoints. Use your `username and password` to authenticate.
- [ ] 🗝️ An `API Key` is required to `Authorize` certain endpoints. Use the API key obtained from the /generate-api-key endpoint.
- [ ] 🎟️ `Bearer Token` Authentication is required for some endpoints. Use your `username and password` to get a token obtained from the /get-auth-token endpoint.



### 🔒 My practice:

#### This API has different endpoints, for different auth types:
1. `GET /random` - no auth
2. `GET /all` - basic auth
3. `GET /filter` - api key auth
4. `GET /user-secrets` - bearer token auth
5. `GET /secrets/{id}` - bearer token auth

## 1. Basic authentication 🔑:

`POST /register` -
Example Request:
`POST https://secrets-api.appbrewery.com/register`
`{
  "username": "shani",
  "password": "123"
}`

register a new user, by passing over a new `username and password`, in the body of post request (Body tab in postman, and select x-www-form-urlencoded).
and once we register on the server, we can use that username and password to perform a request using basic authentication. <br>

now, `GET https://secrets-api.appbrewery.com/all?page=1` .<br>
This endpoint requires basic authentication.
In postman, I will go to the "Authorization tab", select `basic auth`, and enter the `username and password` I just registered with.
in the headers tab, I can see the `authorization value`, which is the username and password encoded in base64. (can be decoded in base64decode.org)

#### Difference between Authentication and Authorization:
Authentication is the process of `verifying who you are (user`, to the API provider.
Authorization is the process of verifying  what the client is allowed to do. and they get an  `API key to authorize themself`. Allows you to use an API.
<br>



### 2. API key authorization 🔑:
Get an `API key`, and use it to perform a request using `API key authorization`.

`GET /generate-api-key` -
Example Request:
`GET https://secrets-api.appbrewery.com/generate-api-key
Example Response:
{
  "apiKey": "generated-api-key"
}`

then I will go to: 
`GET https://secrets-api.appbrewery.com/filter?score=5&apiKey=b886c845-9989-43aa-8c60-ea4a669bb587` route that requires `API authentication`, to make a request, add the parameter "score",
in the Authorization tab, select the API key.
`in Key enter: "apiKey", in Value enter: the API key i just got, and in Header enter: Query Params`, then send.
<br>


### 3. Token based authentication 🔑:
Some paths are protected by `bearer token authentication`. They use username and password to get a token from the server, that will used as a proxy for anybody else to interact with the API as that user.

`POST /get-auth-token` -
Example Request:
`POST https://secrets-api.appbrewery.com/get-auth-token
{
  "username": "shani",
  "password": "123"
}`
`Example Response:
{
  "token": "generated-auth-token"
}`

in the body I will pass over the username and password, once it authenticates that user, then I will get a token.
then i will go to: `GET https://secrets-api.appbrewery.com/secrets/1`. This endpoint requires bearer token auth, so I will go to the "Authorization tab", `select Bearer Token, and enter the token I just got.
in the Headers tab I can see the Authorization value, which is "bearer" + the token I just got`.

#### index.js:
```javascript
// using different endpoints of the API with different authentication methods
import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

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
```


##### JS Code:
![17 a](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/ff1500d1-9e64-460e-8f0d-177dce9495ca)
![17 b](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/7e07d5b0-d91d-4935-bb81-fd328f243a4b)
<br>



## 📁 REST APIs (get, post, put, patch. delete requests) -


#### index.js:
```javascript
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//Add your own bearer token from the previous lesson.
const yourBearerToken = "08f3026d-9c6c-4d88-a3b2-c579dc106247";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  try {
    const result = await axios.post(API_URL + "/secrets", req.body, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
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

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
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

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
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
```
<br>




#### Explanation:

```
//AXIOS GET REQUEST include Token auth-
const result = axios.get (API_URL + "/secrets/42", {
    headers: {
      Authorization: `Bearer ${yourBearerToken}`,
    },
  } );

//or:
const yourBearerToken ="2c0f045e-716d-4031-b5c6-9a5a247eafd9";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

const result = await axios.get(API_URL + "/secrets/" + searchId, config);




//Continue to work with https://secrets-api.appbrewery.com/.
//for other REQUESTS like POST, PUT, PATCH, DELETE.


// 'POST /secrets' -
Adds a new secret. Bearer token authentication is required.

//Request Body:
{
  "secret": "This is a new secret.",
  "score": "Embarrassment score"
}
//Example Request:
//POST https://secrets-api.appbrewery.com/secrets
{
  "secret": "This is a new secret.",
  "score": "Updated embarrassment score"
}
//Example Response:
{
  "id": "3",
  "secret": "This is a new secret.",
  "emScore": 3,
  "username": "user123",
  "timestamp": "2022-10-03T08:15:00Z"
}


// 'PUT /secrets/{id}' -
//Updates the content of the secret with the specified ID. Bearer token authentication is required.

//URL Parameters:
  //id: The ID of the secret to update.

//Request Body:
{
  "secret": "Updated secret content.",
  "score": 5
}

//Example Request:
//PUT https://secrets-api.appbrewery.com/secrets/1
{
  "secret": "Updated secret content",
  "score": "Updated embarrassment score"
}

//Example Response:
{
  "id": "1",
  "secret": "Updated secret content.",
  "emScore": 3,
  "username": "user123",
  "timestamp": "2022-10-01T12:34:56Z"
}


// 'PATCH /secrets/{id}' -
//Partially updates the content of the secret with the specified ID. Bearer token authentication is required.

//URL Parameters:
 //id: The ID of the secret to update.

//Request Body:
{
  "secret": "Updated secret content",
  "score": "Updated embarrassment score"
}

//Example Request:
PATCH https://secrets-api.appbrewery.com/secrets/1
{
  "score": 2
}

//Example Response:
{
  "id": "1",
  "secret": "Partially updated secret content.",
  "emScore": 3,
  "username": "user123",
  "timestamp": "2022-10-01T12:34:56Z"
}




// 'DELETE /secrets/{id}' -
Deletes the secret with the specified ID. Bearer token authentication is required.

//URL Parameters:
  //id: The ID of the secret to delete.

//Example Request:
//DELETE https://secrets-api.appbrewery.com/secrets/1

//Example Response:
{
  "message": "Secret with ID 1 has been deleted successfully."
}
```
<br>


![15](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/a68a6c79-f2b5-466b-bdc9-363f13a045ff)
<br>


## 📁 DIY API
What makes API a good one?
- [x] Data collection.
- [x] Algorithm/ Service.
- [x] Simplified interface.


#### build REST API (representational state transfer) -
##### What makes an API RESTful?

1. `HTTP Methods` -
That it uses standard HTTP methods (get, post, put, patch, delete). These are the standard verbs that you use to interact with our RESTful API.

2. `Json` - It should have a standard data format that it responds with.
Like the JSON format, the javaScript object notation, or XML, as a response to the client.

3. Client and server - in RESTful API are completely separated.
This architecture allows each side to be able to evolve independently without any dependency on the other side.

4. `Stateless` - each request from the client and server should contain all the information needed to complete the request.
So the server shouldn't be storing any sort of client-side state or data between the requests.
So each single request and response can be completed without needing to know what happen previously.
Every time the client makes a request it gives all the information the server need.
This rule allows the server to serve many many clients and requests.

5. `Resource-Based` - It's an API that is based on resources and uses a unique resource identifier, also known as a resource locator- URI or URL.


Actually, the Internet is one of the most successful implementations of RESTful architecture.
(resources located in URL, we work with the server through HTTP methods, we get the response in JSON format/ XML, also we have strict server-client separation.
the client is using the browser, the server is a computer that holds the data that needs to be served when somebody requests a particular web page, 
and finally, the internet is stateless, every single request to a web page contains all of the information that's required in order to determine what web page to sent back).

#### index.js:
```javascript
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const masterKey = "4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT";

app.use(bodyParser.urlencoded({ extended: true }));

//Get a random joke
app.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  res.json(jokes[randomIndex]);
});

//Get a specific joke
app.get("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundJoke = jokes.find((joke) => joke.id === id);
  res.json(foundJoke);
});

//Filter jokes by type
app.get("/filter", (req, res) => {
  const type = req.query.type;
  const filteredActivities = jokes.filter((joke) => joke.jokeType === type);
  res.json(filteredActivities);
});

// Post a new joke
app.post("/jokes", (req, res) => {
  const newJoke = {
    id: jokes.length + 1,
    jokeText: req.body.text,
    jokeType: req.body.type,
  };
  jokes.push(newJoke);
  console.log(jokes.slice(-1));
  res.json(newJoke);
});

//Put a joke
app.put("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const replacementJoke = {
    id: id,
    jokeText: req.body.text,
    jokeType: req.body.type,
  };

  const searchIndex = jokes.findIndex((joke) => joke.id === id);

  jokes[searchIndex] = replacementJoke;
  // console.log(jokes);
  res.json(replacementJoke);
});

//Patch a joke
app.patch("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const existingJoke = jokes.find((joke) => joke.id === id);
  const replacementJoke = {
    id: id,
    jokeText: req.body.text || existingJoke.jokeText,
    jokeType: req.body.type || existingJoke.jokeType,
  };
  const searchIndex = jokes.findIndex((joke) => joke.id === id);
  jokes[searchIndex] = replacementJoke;
  console.log(jokes[searchIndex]);
  res.json(replacementJoke);
});

//DELETE Specific joke
//Optional Edge Case Mangement: Can you think of a situation where we might have an issue deleting
//a specific joke out of the array? Can you think of a solution?
app.delete("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const searchIndex = jokes.findIndex((joke) => joke.id === id);
  if (searchIndex > -1) {
    jokes.splice(searchIndex, 1);
    res.sendStatus(200);
  } else {
    res
      .status(404)
      .json({ error: `Joke with id: ${id} not found. No jokes were deleted.` });
  }
});

//DELETE All jokes
app.delete("/all", (req, res) => {
  const userKey = req.query.key;
  if (userKey === masterKey) {
    jokes = [];
    res.sendStatus(200);
  } else {
    res
      .status(404)
      .json({ error: `You are not authorised to perform this action.` });
  }
});

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});

var jokes = [
  {
    id: 1,
    jokeText:
      "Why don't scientists trust atoms? Because they make up everything.",
    jokeType: "Science",
  }, ....]
```

## 📁 Blog API Project

##### index.js:
```javascript
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});

```

##### server.js:
```javascript
// server.js is going to act as backend #1 that makes the API requests. (port 3000).

import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000; // Default to port 3000 if the PORT environment variable is not set
const API_URL = "http://localhost:4000";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to render the main page
app.get("/", async (req, res) => {
  try {
    const response = await axios.get (`${API_URL}/posts`);
    console.log("response from axios: ", response);
    res.render("index.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

/*
will log:
response from axios:  {
  ...
}

response.data:
data: [
    {
      id: 1,
      title: 'The Rise of Decentralized Finance',
      content: 'Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.',
      author: 'Alex Thompson',
      date: '2023-08-01T10:00:00Z'
    },
    {
      id: 2,
      title: 'The Impact of Artificial Intelligence on Modern Businesses',        
      content: "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
      author: 'Mia Williams',
      date: '2023-08-05T14:30:00Z'
      title: 'Sustainable Living: Tips for an Eco-Friendly Lifestyle',
      content: "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
      author: 'Samuel Green',
      date: '2023-08-10T09:15:00Z'
    }
  ]
}
*/


// Route to render the edit page
app.get("/new", (req, res) => {
  res.render("modify.ejs", { heading: "New Post", submit: "Create Post" });
});


// Route to render the edit page
app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    console.log("response.data of editing post: ", response.data);
    res.render("modify.ejs", {
      heading: "Edit Post",
      submit: "Update Post",
      post: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});
/*
will log:
response.data of editing post:  {
  id: 1,
  title: 'The Rise of Decentralized Finance',
  content: 'Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.',
  author: 'Alex Thompson',
  date: '2023-08-01T10:00:00Z'
}
*/

// Create a new post
app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, req.body);
    console.log("response.data of new post: ", response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});
/*
will log:
response.data:  {
  id: 4,
  title: 'swd',
  content: 'sde',
  author: 'sd',
  date: '2023-12-29T17:41:00.596Z'
}
response: {
  ...
}
*/

// Partially update a post
app.post("/api/posts/:id", async (req, res) => {
  console.log("called");
  try {
    const response = await axios.patch(
      `${API_URL}/posts/${req.params.id}`,
      req.body
    );
    console.log("response.data of updating: ", response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
});
/*
will log:
response.data of updating:  {
  id: 1,
  title: 'The rice of Decentralized Finance',
  content: 'Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.',
  author: 'Alex Thompson',
  date: '2023-08-01T10:00:00Z'
}
response from axios:  {
  ...
}
*/


// Delete a post
app.get("/api/posts/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/posts/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
```
<br>


## 📁 Databases -
### SQL DB- 
Structured Query language.
some SQL sources: oracle, MySQL, PostgreSQL, SQLite. (free and paid).

### NoSQL DB-
it's possible to change the Structure of the data afterwards.


## SQL - 
```sql
/* CRUD = CREATE, READ, UPDATE, DELETE -
https://www.w3schools.com/sql/default.asp
*/

/* customers: */
CREATE TABLE customers(
id INT NOT NULL,
first_name STRING,
last_name STRING,
address STRING,
)

SELECT * FROM 'customers';


/* products: */
CREATE TABLE products(
id INT NOT NULL,
name STRING,
price MONEY,
PRIMARY KEY (id)
)

SELECT * FROM 'products';



/* Updating single values and adding columns: */
UPDATE products
SET stock = 32
WHERE id = 1

/* Delete: */
DELETE FROM products
WHERE id = 2

/* SQL realtionship: */
INSERT INTO products
VALUES (2, "pencil", 0.80, 12)

/* orders: */
id (PRIMARY) | order_number | customer_id, product_id (FORGEIN)

CREATE TABLE orders (
id INT NOT NULL,
order_number INT,
customer_id INT,
product_id INT,
PRIMARY KEY (id)
FORGEIN KEY (customer_id) REFRENCES customers (id)      //for establishing realtionship between 2 tables
FORGEIN KEY (product_id) REFRENCES products (id)      
)

SELECT * FROM 'orders';

INSERT INTO orders
VALUES (1, 4362, 2, 1)

/* Join together the parts of our tables where a particular find key matches - */
SELECT orders.order_number, customers.first_name, customers.last_name, customers.address
FROM orders
INNER JOIN customers ON orders.customer_id = customers.id
```



## 📁 postgreSQL + pgAdmin tables -
#### index.js:
```javascript
//to connect to the DB we need some details to verify ourselves.
// I use the pg package to connect to the DB and send queries to the DB.
//Then I connect to the DB, and send queries to the DB, with db.query. with SQL code inside (structured query language).
//I use a PostgreSQL server, with pgAdmin DB.

import Client from 'pg';

const db = new Client({
    host: "localhost",
    port: 5432,
    database: "world",
    user: "postgres",
    password: "123456",
    });
    db.Connect();

    db.query('SELECT * FROM users', (err, res) => {
        if (err){
            console.error("Error", err.stack);
        } else {
            console.log("user data:", res.rows);
        }
        db.end();
    });
```


#### query.sql:
```sql
/*
The client asks the server for service, and the server handles those requests.
There is also business logic in the App, that talk to the DB (app.js), which stores emails, passwords, and posts.

We have npm packages that help us work with Postgres ("pg").

I will install: "Postgres server", and "pgAdmin".
https://sbp.enterprisedb.com/getfile.jsp?fileid=1258649
*/

CREATE TABLE friends (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    age INT, 
    is_cool BOOLEAN
    );

/* Create a table in Postgres and importing csv file*/
CREATE TABLE capitals (
    id SERIAL PRIMARY KEY,
    country VARCHAR(45),
    capital VARCHAR(45)
    );

/* when we click on view/edit data->all rows, on capitals table in pgAdmin, it create for us this code*/
SELECT * FROM public.capitals;
ORDER BY id ASC;

/* import csv file- right click on the table->import capital.excel->check "header"*/

CREATE TABLE flags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(45),
    flag TEXT
);

CREATE TABLE world_food(
    id SERIAL PRIMARY KEY,
    country VARCHAR(45),
    rice_production FLOAT,
    wheat_production FLOAT
);

/* Query data using SELECT, WHERE, and LIKE -
import world_food table in pgAdmin.
and insert using Query Tool (new query).
*/
INSERT INTO world_food (country, rice_production, wheat_production)
VALUES ('Italy', 1.46, 7.3)


CREATE TABLE countries(
    id SERIAL PRIMARY KEY,
    country_code CHAR (2),
    country_name VARCHAR(100)
);


CREATE TABLE visited_countries(
  id SERIAL PRIMARY KEY,
    country_code CHAR (2)
);
```

#### world-food.csv:
```csv
Country,Rice,Wheat
Australia,0.42,31.9
Brazil,13.98,7.9
China,212.84,136.9
Ethiopia,0.20,5.2
India,195.43,109.6
Iran,1.60,10.1
Pakistan,13.98,27.5
Ukraine,0.05,32.2
United States,8.70,44.8
```
<br>

![20 postgreSQL + pgadmin](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/e1b23648-31ac-41c3-b14b-c93d38cda919)
<br

 

## 📁 Travel Tracker (PostgreSQL) -
![23a](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/d26ef068-58df-448f-8e4c-d87ffdc9b4c7)
![23b](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/fea79e96-489a-4859-9814-52490424ae72)

<br>

---
<br>




## Frontend Based Projects 💻 -

## Simon Game- JQuery -
![simon game](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/e64b9199-b8c3-4c0e-9de8-06762c2b871d)

[11.webm](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/fe226c29-29ab-4e8a-be84-6716f73a48e1)

<br>

## 📁 Drum Kit - HTML + JavaScript  -
![drum](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/b16899cf-e124-4acc-8785-090f73ae1071)

[9.webm](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/156e0865-061d-4a3d-9af9-e2a21e8f7433)

<br>

## 📁 Dicee Challenge - JQuery -
![10](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/b2619676-0718-4d37-a963-b8d92a83de94)

<br>
 
## 📁 TinDog Project - HTML Only
![7](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/70ac0a83-b2b8-46c7-9fd2-6bf44d043b56)
![8](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/dee71eb5-11bf-41c3-99c3-95a94b7cd41d)

### 🛠 Bootstrap snippets:
![Bootstrap-snippets](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/e688b219-3de8-404a-9dd3-38935ad3dd2a)


<br>

## 📁 Web Design - UI/UX experience - 
🛏 3 page hotel website design via Canva: [A Hotel](https://www.canva.com/design/DAFHf-h6aQs/Dsa0hvsbGzIJULqam9Fsow/view?website#4)

![1](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/83cc39ed-b899-4a42-80cd-dc1e2a741695)
![2](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/a5b79b5e-dd21-4fe0-b812-cd5f90641238)
![3](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/b1bd8114-42be-41b5-81eb-b92380c7b723)


 <br>

## 📁 Bootstrap Components -
![4](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/e6c3b37c-394c-4a42-a68b-164cbad1cda2)
![5](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/2d268736-9504-447c-a420-280e45886eb0)
![6](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/89be32c6-dc63-4ecf-9ed7-75b100f3586c)

<br>
 
## 📁 Mondrian Project - Grid -
<img width="1512" alt="dimensions" src="https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/64609c1e-e79d-4d0e-b9ca-806219fe6532">

<br>

## 📁 Flexbox Pricing Table Project -
![2](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/74749d47-9ee3-4538-ac4e-3218ec945682)

<br>
 
## 📁 Web Design Agency Project - CSS -
![1](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/e28e9d16-1f89-4cf0-bbba-7ec2946d94e5)

 <br>

## 📁 HTML Portfolio Project -
![sitePic](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/ebc89a23-328f-4f18-b8ba-e80907f0e909)

<br>

---
<br>


## Topics Covered 📌:
[![My Skills](https://skillicons.dev/icons?i=js,react,html,css,bootstrap,nodejs,express,jquery,mongodb,mysql,postman,postgresql)](https://skillicons.dev)

### Web Development Fundamentals
- [ ] HTML, CSS, JavaScript <img height=20px src="https://skillicons.dev/icons?i=js,html,css">
- [ ] Internet mechanics and server-side operations

### HTML5 
- [ ] Syntax, structure, tags
- [ ] Multi-page websites and best practices

### CSS3  
- [ ] Selectors, properties, specificity
- [ ] Box Model, positioning
- [ ] Font styling, media queries, float properties

### Flexbox
- [ ] Purpose and usage
- [ ] Direction, layout, alignment
- [ ] Sizing and distribution

### Grid
- [ ] Differentiation from Flexbox
- [ ] Display, sizing, positioning
- [ ] Combination with Flexbox for complex layouts

### Bootstrap 
- [ ] Framework, 12-column layout
- [ ] Bootstrap components: buttons, carousels, cards, navigation bars

### Web Design
- [ ] UI/UX principles
- [ ] Color theory, typography
- [ ] DOM structure, traversal

### Document Object Model (DOM)
- [ ] Tree structure of HTML-based websites
- [ ] Separation of concerns and coding best practices
- [ ] Manipulating HTML elements using DOM understanding

### JavaScript ES6  
- [ ] Syntax, data types, control structures
- [ ] Functions, higher-order functions, arrays
- [ ] Object-oriented programming

### React.js  
- [ ] Front-end development
- [ ] Components, Props, JSX syntax
- [ ] DOM, State Management, Hooks

### Node.js
- [ ] Back-end development
- [ ] Data types, OOP, classes
- [ ] NPM, Build Processes, Event Loop

### Express.js   
- [ ] Installation and usage
- [ ] Servers, RESTful Routing, middleware

### Application Programming Interfaces (APIs) and HTTP
- [ ] Documentation
- [ ] Basic authentication and server-to-server communication
- [ ] JSON vs. XML differentiation

### EJS
- [ ] Use with Node and Express
- [ ] Templating, running code in EJS templates, and passing data

### Database Fundamentals
- [ ] Data relationships and model design
- [ ] Relational databases, ERM, ORM

### SQL Databases
- [ ] Schemas, CRUD operations
- [ ] Joins, querying

### PostgreSQL 
- [ ] Queries, CRUD operations Databases
- [ ] Relationship implementation


### Deployment
- [ ] Hosting and deployment
- [ ] GitHub Pages, Heroku, Mongo Atlas


### Building RESTful APIs 
- [ ] REST principles, API design
- [ ] MongoDB GUI Robo 3T usage


### Authentication and Security
- [ ] Need for authentication, secure user details
- [ ] Encryption, hashing, salting with bcrypt
- [ ] Sessions, cookies, Passport, OAuth 2.0 for logins
<br>

---
<br>


# 📋Resources -

## Concepts I Learned:

#### ✅ Node is like js in browser -
![node is like js in browser](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/ecaccaeb-2d3a-41b9-b412-e9de21997afc)

#### ✅ Server Protocol -
![server protocol](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/e4032951-ea67-4edc-9b77-ba6c85cfa7ff)

#### ✅ JSON viewer- more intuative -
![JSON viewer- more intuative](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/6f5a4d9a-f8d7-4b97-aba3-bb7380dd30d5)

#### ✅ OAuth (Token based Auth) Process -
![OAuth (Token based Auth)](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/16d2616d-04e4-4368-9932-ebc4c35dba78)

#### ✅ base64 decode -
![base64 decode](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/70c1e394-b1f5-46bf-832c-e7b7372bf068)

##### ✅ JSON + API - getting all data as inquire
![json+api - getting all data as inquire](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/1eeebc6a-33c9-4637-828b-b264c03403f5)

#### ✅ One-to-one Relation -
![one to one- db](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/17725a07-0254-4345-9571-80618e7a46b6)

#### ✅ Many-to-one Relation -
![many to one- join](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/fb147c2e-3dd0-4f50-887a-20dc6d1cd546)

#### ✅ Font Size -
![font](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/b9af07e1-217c-4a83-9dd6-e52f76e55cc9)

#### ✅ EJS Tags -
![ejs tags](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/84579b7d-80b3-4906-a012-e54f6de94a0e)

#### ✅ Dom Tree Generator - 
![DOM](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/a7628834-e956-42e1-85fc-a2649ec119bf)

#### ✅ Dev Mode Debugger
![dev mode-debugger](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/c3a10091-1182-4eea-864d-78bf21dcb8e9)

##### ✅ Math random() + Math.floor() - 
<img width="816" alt="Math random()" src="https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/cd12b364-78cf-4cf8-a7c8-f31709f0b0ce">
<br>

---
<br>


## VSCode Extensions -

### Recommended -
- [ ] esbenp.prettier-vscode
- [ ] formulahendry.auto-close-tag
- [ ] hex-ci.stylelint-plus
- [ ] dbaeumer.vscode-eslint
- [ ] naumovs.color-highlight
- [ ] DigitalBrainstem.javascript-ejs-support

### Optional -
- [ ] ritwickdey.LiveServer
- [ ] erikphansen.vscode-toggle-column-selection
- [ ] file-icons
<br>

---
<br>



## Course Syllabus
![Web Dev Syllabus 2](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/c21eb31f-3c06-4377-b270-236d49711ad1)
![Web Dev Syllabus 3](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/df763949-90b5-4716-81ee-d60af0f99e55)
![Web Dev Syllabus 4](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/c6b1784f-ba2e-4a99-bf0d-ed90bf233b8f)
![Web Dev Syllabus 5](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/5d3906c6-b881-4af8-a61c-5aa8be2f7bab)
![Web Dev Syllabus 6](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/448effec-a51b-4463-b583-691b284628bb)
![Web Dev Syllabus 7](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/90a62dda-0bbc-4ccd-9005-f86db63a4015)

<br>

---
<br>



## Course Extra Info
###### css flexbox -
![css-flexbox-poster](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/c3e68218-7c05-4e80-a3df-a1f0142a5382)
###### html cheatsheet -
![html cheatsheet 1](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/ed7cb574-2b57-4a81-9358-5e7d418df39f)
![html cheatsheet 2](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/e6b4c4db-8ffd-456f-8d93-6ee3c12e8de9)
###### css cheatsheet -
![css cheatsheet 1](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/bd028ad2-55f3-4c07-ac5e-4f64a037f2a1)
![css cheatsheet 2](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/7cebfa9f-e170-4a15-86b8-23d51fef14a0)
###### Stacking Order Flowchart -
![Stacking Order Flowchart](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/0af09ef6-91ad-440e-b61b-e3c4265affa7)
###### The emotions behind Fonts -
![fonts](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/f6c2816d-770b-425d-897b-e31d450596a0)
###### UI- luxury vs cheap -
![UI- luxury vs cheap](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/1b1c85b4-8dd9-492b-829d-970d3236246e)
###### Goal Setting Question -
![Goal Setting Questions](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/assets/72359805/303dfa7d-c2f5-4fb3-a537-2caf6c77bbff)

Click here for 👉 ['12 Rules to Learn to Code Guide' from this course.pdf](https://github.com/shanibider/The-Complete-2024-Web-Development-Bootcamp/files/14229238/12.Rules.to.Learn.to.Code.pdf)


<br>

---
<br>


## Run Locally

Clone the project

```bash
  git clone https://github.com/shanibider/Web-Development-Projects.git
```

Go to the project directory

```bash
  cd "project-directory"
```

Install dependencies

```bash
  npm i
```

Start the server

```bash
  npm start / nodemon index.js
```

<br>

---
<br>


## 🚀 About Me
I'm a passionate full-stack developer with a strong foundation in website development. With a bachelor's degree in computer science and specialized skills in web technologies, I bring a creative and detail-oriented approach to my projects. I thrive on tackling challenges and finding innovative solutions to enhance user experiences.

<br>

## 🛠 Skills
I own a diverse skill set in web technologies, enabling me to develop dynamic and responsive applications. Here are some of the key skills in my toolkit:

- **JavaScript:** Proficient in both frontend and backend development using modern JavaScript frameworks and libraries.
  
- **HTML/CSS:** Strong command over HTML and CSS to create visually appealing and well-structured web pages.

- **Full Stack Development:** Experience in developing end-to-end web applications, from server-side logic to the frontend user interface.

- **Version Control:** Skilled in using Git and GitHub to track changes, collaborate with others, and manage project repositories effectively.

<br>

> [!TIP]
> Feel free to explore each code practice and enhance your skills in various JavaScript technologies😊👩‍💻💻
> <br>


<br>




## 📫 Connect with me 😊
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shani-bider/)
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://shanibider.github.io/Portfolio/)
[![gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:shanibider@gmail.com)

<footer>
<p style="float:left; width: 20%;">
Copyright © Shani Bider, 2024
</p>
</footer>

## License📄

This project is licensed under the MIT License.

