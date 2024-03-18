import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcryptjs from "bcryptjs";
import passport from "passport";
import { Strategy } from "passport-local";    
import session from "express-session";
import env from "dotenv";


// Sessions & Cookies
// login here saved as a cookie, so we don't need to relogin if users come back to the website, whitin a certain time.
// we can see the website's cookie in the browser's settings.
// This project is about sessions. Sessions ia the time between login and logout.
// Active session is saved in the server, and keep the user logged in.
// Will use here the passport package, which is a middleware for authentication, and express-session.

const app = express();
const port = 3000;
const saltRounds = 10;
env.config();


// using session as middleware, so using app.use()
// adding options in sessions
app.use(
  session({
    secret: "TOPSECRETWORD",
    resave: false,
    saveUninitialized: true,
  })
);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


// important to use passport after session
app.use (passport.initialize());
app.use (passport.session());


const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "123456",
  port: 5432,
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


// user go to this route straight from url. 
app.get("/secrets", (req, res) => {
  // console.log (req.user);       // the user details from db
  if (req.isAuthenticated()) {    // this is a passport method
    res.render("secrets.ejs");
  } else {
    res.redirect("/login");
  }
});



// instaed of handling the login with async function as normally, i use passport as middelware.
// this will trigger the 'strategy' i defined in passport.use().
// so i tell - use the "local" strategy, in order to authenticate this practicular request,
// then it sets some options. first, redirect to secrets page, and if it's fail, redirect to login page.
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secrets",     // Redirect to "/secrets" on successful authentication
    failureRedirect: "/login",
  })
);




app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM secrets_users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      req.redirect("/login");
    } else {
      bcryptjs.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const result = await db.query(
            "INSERT INTO secrets_users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );

          const user = result.rows[0];

          // using passport method to login the user. Includes a callback function, to do when everything is done.
         // with this method it automatically authenticate our user, passes user info into the session, serialize it, deserialize it, and in the "req.isAuthenticated()" above it will return "true
          req.login(user, (err) => {
            console.log("success");
            res.redirect("/secrets");
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});




// use this as strategy for passport. verify is a callback function that take 3 parameters: username, password, callback.
// username and password are also the name attributes in the form in login.ejs.
// inside i put everything that i want to do to verify the user (from login).
// i know all of this from the documentation of passport (verify password section). (they use crypto package to hash the password, but i use bcrypt).
// passport function get triggered when we try to authenticate a user.

passport.use( new Strategy(async function verify (username, password, cb) {
  console.log (username);

  // check if we have a user with the current email (check the username comes from the form)
    try {
      const result = await db.query("SELECT * FROM secrets_users WHERE email = $1 ", [
        username,
      ]);

      if (result.rows.length > 0) {

        const user = result.rows[0];
        const storedHashedPassword = user.password;

        // using bcrypt to compare the password from the form to the hashed password in the database.
        bcryptjs.compare (password, storedHashedPassword, (err, valid) => {
          if (err) {
            //Error with password check
            console.error("Error comparing passwords:", err);
            return cb(err);
          } 
          
          // instaed of just rendering with res.render, i pass a callback.
          // the callbacl include any errors, and the user object- deatils of the user.
          else {
            if (valid) {
              //Passed password check
              return cb(null, user);
            } 
            
            // if any errors occured, i pass null, and user as false (means user isn't authenticated)
            else {
              //Did not pass password check
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {     // in case db query failed
      console.log(err);
    }
  })
);



// serializeUser and deserializeUser are passport methods.
// serializeUser is used to store the user object in the session.
// deserializeUser is used to retrieve the user object from the session.
passport.serializeUser((user, cb) => {
  cb(null, user);     // using callback to pass any deatils of the user.
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});