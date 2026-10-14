const passport = require("passport");
const User = require("../models/user");

// ---------- Register (GET) ----------
module.exports.renderRegisterForm = (req, res) => {
  res.render("users/signup", { title: "Sign Up" });
};

// ---------- Register (POST) ----------
module.exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);

      req.flash(
        "success",
        `Welcome, ${username}! Your account was created.`
      );

      return res.redirect("/");
    });
  } catch (err) {
    if (err.name === "UserExistsError") {
      req.flash("error", "Username already exists! Please choose another.");
    } else {
      req.flash("error", err.message || "Registration failed. Please try again.");
    }

    return res.redirect("/register");
  }
};

// ---------- Login (GET) ----------
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs", { title: "Login" });
};

// ---------- Login (POST) ----------
module.exports.loginUser = [
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),

  (req, res, next) => {
    const redirectUrl = req.session.redirectUrl || "/";
    delete req.session.redirectUrl;

    req.flash("success", `Welcome back, ${req.user.username}!`);

    req.session.save((err) => {
      if (err) return next(err);
      res.redirect(redirectUrl);
    });
  },
];


// ---------- Logout ----------
module.exports.logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.flash("success", "Logged out successfully.");
    res.redirect("/");
  });
};