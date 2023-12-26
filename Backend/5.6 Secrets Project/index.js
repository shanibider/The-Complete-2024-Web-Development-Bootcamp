// Project to practice:
// 1. Work with an API
// 2. Understand the docs of an API
// 3. Use axios and Express to make requests to an API, and grab the data from the response


// Work Plan:
// 1. Import express and axios
import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

// 2. Create an express app and set the port number.
const app = express();    // crete a new express app
const port = 3000;

// 3. Use the public folder for static files. (images in public folder, and stylesheet in public/styles.css)
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


// 4. When the user goes to the home page it should render the index.ejs file.
app.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://secrets-api.appbrewery.com/random");  
        console.log ("Result (random activity): ", response.data.secret);   
        console.log ("Result (random activity): ", response.data.username);
      // 5. Use axios to get a random secret and pass it to index.ejs to display the
      // secret and the username of the secret.
        res.render("index.ejs", { secret: response.data.secret, user: response.data.username });      // render the index.ejs file and pass the secret and the username of the secret
     
      } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {error: error.message,});
      }
    });


// 6. Listen on your predefined port and start the server.
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});