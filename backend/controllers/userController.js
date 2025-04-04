const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.send({
        success: false,
        message: "user already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    const newUser = new User(req.body);
    await newUser.save();

    res.send({
      message: "user created successfully",
      data: null,
      success: true,
    });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};

exports.login = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // if (!user.isVerified) {
    //   return res.send({
    //     success: false,
    //     message: "User is not yet Verified or has been suspended",
    //   });
    // }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.send({
      message: "user logged in successfully",
      data: token,
      success: true,
    });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
};


