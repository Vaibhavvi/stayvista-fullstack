const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const MongoStore = require("connect-mongo");

const ExpressError = require("./src/utils/ExpessError.js");
const listingRouter = require("./src/router/listing.js");
const reviewRouter = require("./src/router/review.js");
const userRouter = require("./src/router/user.js");
const User = require("./src/models/user.js");

// Load environment variables before using them.
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const MONGO_URL = process.env.ATLASDB_URL;
const SECRET_KEY = process.env.SECRET_KEY;
const PORT = process.env.PORT || 8000;

// Validate configuration early.
if (!MONGO_URL) {
  throw new Error("Missing ATLASDB_URL in environment variables.");
}

if (!SECRET_KEY) {
  throw new Error("Missing SECRET_KEY in environment variables.");
}

/* ------------------ EJS ------------------ */

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

/* ------------------ Middleware ------------------ */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

/* ------------------ Session Store ------------------ */

const store = MongoStore.create({
  mongoUrl: MONGO_URL,
  crypto: {
    secret: SECRET_KEY,
  },
  touchAfter: 24 * 60 * 60,
});

store.on("error", (err) => {
  console.error("SESSION STORE ERROR:", err);
});

/* ------------------ Session ------------------ */

app.use(
  session({
    store,
    name: "stayvista.sid",
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
  })
);

/* ------------------ Flash + Passport ------------------ */

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* ------------------ Common Locals ------------------ */

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user || null;
  next();
});

/* ------------------ Routes ------------------ */

app.get("/", (req, res) => {
  res.render("home.ejs", {
    title: "StayVista Home",
  });
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

/* ------------------ 404 Handler ------------------ */

app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

/* ------------------ Central Error Handler ------------------ */

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || err.status || 500;

  // Avoid exposing internal server errors in production.
  const message =
    statusCode >= 500 && process.env.NODE_ENV === "production"
      ? "Something went wrong on our end. Please try again later."
      : err.message || "Something went wrong!";

  if (statusCode >= 500) {
    console.error(err);
  }

  res.status(statusCode).render("error.ejs", {
    err: {
      statusCode,
      message,
    },
  });
});

/* ------------------ Database + Server ------------------ */

async function startServer() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`StayVista running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start StayVista:", err);
    process.exit(1);
  }
}

startServer();
