const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const Env = require("../../../configs/enviroment");
module.exports.create = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "invalid username or password",
      });
    }

    return res.json(200, {
      message: "Here is your token generated,keep it secret!",
      data: {
        token: jwt.sign(user.toJSON(), Env.jwt_secret, { expiresIn: "100000" }),
      },
    });
  } catch (err) {
    return res.json(500, {
      message: "Unauthorised Activity",
    });
  }
};


