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


// My Client ID and Client Secret
// {"web":{"client_id":"147654195854-e58g7a9k40q750fr5smpqls4lvfiivj9.apps.googleusercontent.com","project_id":"secrets-412813","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"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","redirect_uris":["http://localhost:3000/auth/google/secrets"],"javascript_origins":["http://localhost:3000"]}}



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
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      req.redirect("/login");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];
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





// local strategy
passport.use(
  "local",
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
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
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          profile.email,
        ]);

        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [profile.email, "google"]
          );

          return cb(null, newUser.rows[0]);
        } else {
          return cb(null, result.rows[0]);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);



passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
