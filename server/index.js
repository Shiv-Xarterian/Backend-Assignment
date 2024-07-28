const express = require("express");
const dotenv = require("dotenv");
const router = require("./Routes/practice");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config({
  path: ".env",
});
//server created
require("./database");

const Port = process.env.Port;

app.use("/api", router);

app.listen(Port, () => {
  console.log(`Server running on Port ${Port}`);
});
//server listening on Port 4000
