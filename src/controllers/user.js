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

      res.redirect("/");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/register");
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

  (req, res) => {
    req.flash("success", `Welcome back, ${req.user.username}!`);

    res.redirect(res.locals.redirectUrl || "/");
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