// JSON- javaScript Object Notation, its a way ro format data that can be sent over the internet in a readable nut also afficient way.

// in this project, i set up a server that sends an object (converted from JSON string) to the client, and the client use it to display information on the page.
// i use redirect to send the user back to the root page after they make a choice, and the server sends the updated recipe data to the client, 
// allowing the template to be re-rendered with the new recipe information.

import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

//Step 1: Run the solution.js file without looking at the code.
//Step 2: You can go to the recipe.json file to see the full structure of the recipeJSON below.

// JSON string containing an array of 3 recipes.
const recipeJSON =
  '[{"id": "0001","type": "taco","name": "Chicken Taco","price": 2.99,"ingredients": {"protein": {"name": "Chicken","preparation": "Grilled"},  "salsa": {"name": "Tomato Salsa","spiciness": "Medium"},  "toppings": [{"name": "Lettuce",  "quantity": "1 cup",  "ingredients": ["Iceberg Lettuce"]  },      {"name": "Cheese",  "quantity": "1/2 cup",  "ingredients": ["Cheddar Cheese", "Monterey Jack Cheese"]  },      {"name": "Guacamole",  "quantity": "2 tablespoons",  "ingredients": ["Avocado", "Lime Juice", "Salt", "Onion", "Cilantro"]  },      {"name": "Sour Cream",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream"]  }      ]    }  },{"id": "0002","type": "taco","name": "Beef Taco","price": 3.49,"ingredients": {"protein": {"name": "Beef","preparation": "Seasoned and Grilled"},  "salsa": {"name": "Salsa Verde","spiciness": "Hot"},  "toppings": [{"name": "Onions",  "quantity": "1/4 cup",  "ingredients": ["White Onion", "Red Onion"]  },      {"name": "Cilantro",  "quantity": "2 tablespoons",  "ingredients": ["Fresh Cilantro"]  },      {"name": "Queso Fresco",  "quantity": "1/4 cup",  "ingredients": ["Queso Fresco"]  }      ]    }  },{"id": "0003","type": "taco","name": "Fish Taco","price": 4.99,"ingredients": {"protein": {"name": "Fish","preparation": "Battered and Fried"},  "salsa": {"name": "Chipotle Mayo","spiciness": "Mild"},  "toppings": [{"name": "Cabbage Slaw",  "quantity": "1 cup",  "ingredients": [    "Shredded Cabbage",    "Carrot",    "Mayonnaise",    "Lime Juice",    "Salt"          ]  },      {"name": "Pico de Gallo",  "quantity": "1/2 cup",  "ingredients": ["Tomato", "Onion", "Cilantro", "Lime Juice", "Salt"]  },      {"name": "Lime Crema",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream", "Lime Juice", "Salt"]  }      ]    }  }]';

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let data;

// handle HTTP GET requests to the root ("/"), renders "index.ejs", second parameter is an object {recipe: data}, data is a variable containing recipe information.
app.get("/", (req, res) => {
  res.render("index.ejs", { recipe: data });  
});


/* handle POST requests to "/recipe" endpoint. uses switch to determine the choice made by the user based on 'req.body.choice'.
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


/*
Explanation for res.redirect("/") in the POST route:

When the user visits the root ("/") using a GET request (e.g., by entering the site or refreshing the page),
the server sends the "index.ejs" template along with the current recipe data to the client for rendering.
When the user submits the form on the page (using the button with different values),
a POST request is sent to "/recipe".
The server processes this request, updates the data variable based on the user's choice, and then redirects the user back to the root ("/").
The GET route for the root ("/") is then triggered again, and the updated recipe data is sent to the client,
allowing the template to be re-rendered with the new recipe information.
This approach essentially uses a server-side redirect to refresh the page with the updated recipe data after the user makes a choice.
*/

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

