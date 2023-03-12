const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connect DB successfull !!!");
  } catch (err) {
    console.log(err);
  }
}

module.exports = { connect };
