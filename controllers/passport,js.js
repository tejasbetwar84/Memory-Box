const User = require("../models/user");
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }
  return res.render("sign-up", {
    title: "sign-up",
  });
};

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }
  return res.render("sign-in", {
    title: "sign-in",
  });
};

module.exports.profile = function (req, res) {
  return res.render("profile", {
    title: "profile",
  });
};
module.exports.signout = function (req, res) {
  req.logout();
  return res.redirect("/");
};

module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error");
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) console.log("error");

        return res.redirect("/user/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};
