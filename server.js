/* ******************************************
 * This server.js file is the primary file of the
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const env = require("dotenv").config();
const app = express();
const static = require("./routes/static");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const pool = require("./database/");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const utilities = require("./utilities");

const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout"); // not at views root

/* ***********************
 * Middleware
 * ************************/
app.use(
  session({
    store: new (require("connect-pg-simple")(session))({
      createTableIfMissing: true,
      pool,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    name: "sessionId",
  })
);

// Express Messages Middleware
app.use(require("connect-flash")());
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cookieParser());

app.use(utilities.checkJWTToken);

/* ***********************
 * Routes
 *************************/
app.use(static);

// Home Pages
app.get("/", (req, res) => {
  res.render("./index");
});

// Team Page
app.get("/team", (req, res) => {
  res.render("./team");
});

// About page
app.get("/about", (req, res) => {
  res.render("./about");
});

// Contact page
app.get("/contact", (req, res) => {
  res.render("./contact");
});

// Product pages
app.use("/products", productRoute);

// User pages
app.use("/user", userRoute);

// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page." });
});

/* ***********************
 * Express Error Handler
 * Place after all other middleware
 *************************/
app.use(async (err, req, res, next) => {
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  if (err.status == 404) {
    message = err.message;
  } else {
    message =
      "Oh no! There was a crash. Maybe try a different route?<br><br><strong>" +
      err.message +
      "</strong>";
  }
  res.render("errors/error", {
    title: err.status || "Server Error",
    message,
  });
});

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT;
const host = process.env.HOST;

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
});
