const { join } = require("path");
const express = require("express");
const passport = require("passport");
const { Strategy } = require("passport-local");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

const UsersModel = require("./api/users/users.model");

const router = express.Router();

router.use("/docs", express.static(join(__dirname, "docs")));

router.use("/assets", express.static(join(__dirname, "assets")));

passport.use(
  "local",
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    UsersModel.localStrategyAuth.bind(UsersModel)
  )
);

passport.serializeUser(UsersModel.serializeUser.bind(UsersModel));

passport.deserializeUser(UsersModel.deserializeUser.bind(UsersModel));

router.use(
  session({
    secret: "secret string",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      stringify: false,
    }),
  })
);

router.use(passport.initialize());
router.use(passport.session());

router.get("/", (req, res) => {
  res.render("index.nunjucks", {
    user: req.user,
    clicks: req.session.clicks || 0,
  });
});

router.get("/login", (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("login.nunjucks", {});
});

router.get("/logout", (req, res) => {
  req.logOut();
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.redirect("/login");
});

router.use(express.json());

router.use("/api", require("./api/index"));

router.use((err, req, res, next) => {
  let e = { message: "" };
  if (err.joi) {
    e = err.joi.details;
  } else if (err.name === "MongoError") {
    e.message = err.errmsg;
  } else {
    e = err;
  }
  if (!Array.isArray(e)) {
    e = [e];
  }
  res.status(e.status || 400).send(e);
});

module.exports = router;
