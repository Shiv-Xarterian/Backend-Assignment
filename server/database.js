const mongoose = require("mongoose");
const connectdatabase = mongoose
  .connect(process.env.Mongo)
  .then((res) => {
    console.log(`DataBase Connected`);
  })
  .catch((err) => {
    console.log("--------", process.env.Mongo);
    console.log(`Error in Connection with DataBase -> ${err.message}`);
  });

module.exports = { connectdatabase };
