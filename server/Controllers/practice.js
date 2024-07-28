var passport = require("passport");
const Practice = require("../Models/practice");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const getrequest = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      Message: "Get Request Done",
    });
  } catch (error) {
    return res.status(500).json({
      Error: error.message,
    });
  }
};

const postrequest = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      Message: "Post Request Done",
    });
  } catch (error) {
    return res.status(500).json({
      Error: error.message,
    });
  }
};

const putrequest = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      Message: "Put Request Done",
    });
  } catch (error) {
    return res.status(500).json({
      Error: error.message,
    });
  }
};

const deleterequest = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      Message: "Delete Request Done",
    });
  } catch (error) {
    return res.status(500).json({
      Error: error.message,
    });
  }
};

const loginrequest = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ Errors: errors.array() });
    }
    const { UserName, UserPassword } = req.body;

    const user = await Practice.findOne({
      Name: UserName,
    });

    if (!user) {
      throw new Error("No User Found! Please Login");
    }

    const isPasswordCorrect = bcrypt.compareSync(UserPassword, user.Password);

    if (!isPasswordCorrect) throw new Error("Wrong Password!");

    const Token = jwt.sign({ _id: user._id }, process.env.Secret);

    return res.status(200).json({
      success: true,
      Message: "User Logged In Successfully",
      Token: Token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      Error: error.message,
    });
  }
};

const registerrequest = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ Errors: errors.array() });
    }
    const { UserName, UserPassword } = req.body;

    let user = await Practice.findOne({
      Name: UserName,
    });
    if (user) {
      throw new Error("User Already Exists! Please Login");
    }

    const HashedPassword = bcrypt.hashSync(
      UserPassword,
      parseInt(process.env.Rounds)
    );

    user = await Practice.create({
      Name: UserName,
      Password: HashedPassword,
    });

    const Token = jwt.sign({ _id: user._id }, process.env.Secret);

    return res.status(200).json({
      success: true,
      Message: "User Registered Successfully",
      User: user,
      Token: Token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      Error: error.message,
    });
  }
};

const protectedrequest = async (req, res) => {
  try {
    const id = req.id;
    const user = await Practice.findById(id);

    if (!user) {
      throw new Error("UnAuthorized Access");
    }

    return res.status(200).json({
      success: true,
      Message: "Authorised User",
    });
  } catch (error) {
    return res.json({
      success: false,
      Error: error.message,
    });
  }
};
module.exports = {
  getrequest,
  postrequest,
  putrequest,
  deleterequest,
  loginrequest,
  registerrequest,
  protectedrequest,
};
