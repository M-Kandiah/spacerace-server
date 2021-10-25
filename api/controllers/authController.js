require("dotenv").config({path: __dirname + '/./../.env'});
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/users");

async function create(req, res) {
  try {
      const salt = await bcrypt.genSalt();
      const hashed = await bcrypt.hash(req.body.password, salt);
      await User.create(req.body.username, hashed);
      res.status(201).json({ message: "User has been created successfully" });
  } catch (err) {
    res.status(500).json({ err });
  }
}

async function checkLogin(req, res) {
  try {
    const user = await User.findByUserName(req.body.userName);
    if (!user) {
      throw new Error("No user found");
    }
    const authed = await bcrypt.compare(req.body.password, user.passwordHash);
     console.log(authed)
    if (authed) {
      const payload = { username: user.userName, id: user.userId };
      const sendToken = (err, token) => {
        if (err) {
          throw new Error("Error in token generation");
        }
        res.status(200).json({
          success: true,
          token: "Bearer " + token,
        });
      };
      jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, sendToken);
    } else {
      throw new Error("User could not be authenticated");
    }
  } catch (err) {
    res.status(401).json({ err });
  }
}

module.exports = { create, checkLogin };


