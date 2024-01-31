import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
//import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import env from "dotenv";

// Level 3 Authentication - using OAuth (Open Authorisation, third party) to authenticate users, without storing their credentials.
// for this we need to:
// 1. Set up your app.
// 2. Redirect to authenticate. (an option to login with google).
// 3. User logs in (on facebook page).
// 4. User grants permissions.
// 5. Recieve 'authorisation code'.
// 6. Step further, Exchange authorisation code for 'access token'. This will allow us to access the user's data (email, friends, etc).
// Auth code - is like a "one time ticket", while access token is like a "Year pass".



// Setting up Google OAuth Credentials - Setting up "Login with Google" in my website:
// Create a button that allows users to log into your website using their google account.

//1. Sign in to google cloud console - Navigate to https://console.cloud.google.com/ and sign in with Google account. 
//2. Create a new project
//3. Access "Credentials" under APIs & Services
//4. Configure Consent Screen
//5. Configure your Scope
//6. Create your client ID
//7. Add localhost to your redirect URI
//8. Copy your Client ID and Client Secret
//9. Create a .env file in your project directory and add your Client ID and Client Secret to it.

//When trying logi with google i will get "Access blocked: Secrets has not completed the Google verification process", because it takes 1-3 months for google to verify my app.




const app = express();
const port = 3000;
const saltRounds = 10;
env.config();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());


const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();


app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets.ejs");
  } else {
    res.redirect("/login");
  }
});



// when user hit "sign in with google" button, we redirect him to google's login page.
// then using the Passport middelware. Then add the strategy i want to authenticate with ("google").
// then add some options. What i want yo get rom this login- scope (profile and email).
// then i will recieve it in the passport authentication middleware (GoogleStrategy).
app.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);






app.get(
  "/auth/google/secrets",
  passport.authenticate("google", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  })
);





app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  })
);




app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
        // Checking if a user with the given email already exists
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
            // Redirecting to login if the user already exists
      req.redirect("/login");
    } else {

      // Hashing the password and inserting a new user into the database
      bcrypt.hash (password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {

          // Inserting the new user into the database and logging them in
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );

          const user = result.rows[0];

          req.login (user, (err) => {
            // Logging success and redirecting to secrets page
            console.log ("success");
            res.redirect ("/secrets");
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});





// local strategy
passport.use(
  "local",
  new Strategy(async function verify(username, password, cb) {
    try {
       // Verifying user credentials by querying the database
      const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
        username,
      ]);
      if (result.rows.length > 0) {
        // If user exists, compare hashed passwords
        const user = result.rows[0];
        const storedHashedPassword = user.password;

        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            // Returning the user if passwords match, otherwise false
            if (valid) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  })
);






// passport authentication middleware
// varaibles stored in .env
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    // callback function that get triggered once the proccess succeeded
    async (accessToken, refreshToken, profile, cb) => {
      try {
        // logging the user's data
        console.log(profile);


        // save the user data into the db and identify them in our system

        // queries the database to select where the email matches the provided email
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          profile.email,
        ]);

        // checks if the result has any rows (user with the given email), if not a new user is inserted into the "users" table with the provided email and a default password ("google").
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [profile.email, "google"]
          );

        // The new user's info then returned via the callback function
          return cb(null, newUser.rows[0]);
        } else {
          return cb(null, result.rows[0]);    // If there are rows in the result, means a user with the given email already exists, and this info returned via the cb function.
        }


      } catch (err) {
        return cb(err);
      }
    }
  )
);



// Serialization and deserialization functions for Passport to store and retrieve user information during the authentication process.
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



/*
Serialization and deserialization -
processes used by Passport.js, an authentication middleware for Node.js, to store and retrieve user information during the authentication process.

- Serialization: It's the process of transforming the user object into a format that can be stored in a session or other persistent storage.
This is done after a user successfully logs in. The serialized user information is typically stored in a session cookie.

- Deserialization: It's the opposite process of serialization. It involves taking the stored user information (often from a session cookie) and converting it back into a user object.
This is done when a user makes subsequent requests, allowing Passport to identify the user and attach the user object to the request object.

In the code above, the following Passport.js functions handle serialization and deserialization:
- `serializeUser`: This function takes 2 parameter - a user object and a callback function.
The user object is typically the result of a successful authentication. The callback function is used to store the user information (or a key that can be used to retrieve it) in a session.

- `deserializeUser`: This function is responsible for retrieving the user information from the session.
It takes the user object (or the key) stored during serialization and a callback function. The callback function is then called with the retrieved user information, which is attached to the `req.user` property, making it available in subsequent requests.

These functions ensure that Passport can maintain user authentication across different requests by storing and retrieving user information in a secure and efficient manner.
*/