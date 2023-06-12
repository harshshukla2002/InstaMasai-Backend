const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../Model/Blacklist.model");

const Auth = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) res.status(200).json({ msg: "Not Authrized" });
  else {
    const blacklisted = await BlacklistModel.findOne({ token });
    if (blacklisted) {
      res.status(400).json({ msg: "You Logged Out now you have to login" });
    } else {
      jwt.verify(token, process.env.secret, (err, decode) => {
        if (decode) next();
        else {
          res.status(400).json({ err });
        }
      });
    }
  }
};

module.exports = { Auth };
