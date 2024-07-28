const express = require("express");
const {
  getrequest,
  postrequest,
  putrequest,
  deleterequest,
  loginrequest,
  registerrequest,
  protectedrequest,
} = require("../Controllers/practice");
const UserValidation = require("../Middleware/checkAuth");
const { header, body, validationResult } = require("express-validator");

const router = express.Router();

// .method("path",what to do on that path);

router.get("/get", getrequest);
//get request

router.post("/post", postrequest);
//post request

router.put("/put", putrequest);
//put request

router.delete("/delete", deleterequest);

router.put(
  "/login",
  [[body("UserName").notEmpty(), body("UserPassword").notEmpty()]],
  loginrequest
);

router.post(
  "/register",
  [[body("UserName").notEmpty(), body("UserPassword").notEmpty()]],
  registerrequest
);

router.get(
  "/protected",
  [[header("Token").notEmpty()]],
  UserValidation,
  protectedrequest
);

module.exports = router;
