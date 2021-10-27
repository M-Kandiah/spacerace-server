require("dotenv").config({ path: __dirname + '/./../.env' });
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Usermon = require("../models/userMon")

async function create(req, res) {
  try {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(req.body.password, salt);
    const user = new Usermon({
      username: req.body.username,
      passwordHash: hashed,
      points: 0,
      wins: 0,
    })

    

    user.save()
      .then(() => res.status(201).json({ message: "User has been created successfully" }))
      .catch((err) => console.log(err))
  } catch (err) {
    res.status(500).json({ err });
  }
}

async function checkLogin(req, res) {
  try {
    const userArr = await Usermon.find({ username : req.body.username })
    const user = userArr[0]
    if (!user) {
      throw new Error("No user found");
    }
    const authed = await bcrypt.compare(req.body.password, user.passwordHash);
    if (authed) {
      const payload = { username: user.username, id: user._id };
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


