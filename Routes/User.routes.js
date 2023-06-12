const express = require("express");
const { UserModel } = require("../Model/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserRoutes = express.Router();

UserRoutes.post("/register", async (req, res) => {
  const { name, email, password, gender, age, city, is_married } = req.body;

  const userPresent = await UserModel.find({ email });

  if (userPresent.length > 0) {
    res.status(200).json({ msg: "User Already Present" });
    return;
  }

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) res.status(400).json({ err });
      else {
        const user = await UserModel({
          name,
          email,
          password: hash,
          gender,
          age,
          city,
          is_married,
        });
        await user.save();
        res.status(200).json({ msg: "User Added" });
      }
    });
  } catch (error) {
    res.status(400).json({ err });
  }
});

UserRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (err) res.status(400).json({ msg: `wrong password or ${err}` });
        else {
          const token = jwt.sign({ name: user.name }, process.env.secret, {
            expiresIn: "7d",
          });
          res.status(200).json({ msg: "Login Success", token });
        }
      });
    } else {
      res.status(404).json({ msg: "User Not Found or Email Was Wrong" });
    }
  } catch (error) {}
});

module.exports = { UserRoutes };
