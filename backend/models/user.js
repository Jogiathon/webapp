const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var nameRegex = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

// user data structure
const UserSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: {
      type: String,
      required: true,
      match: nameRegex
    },
    password: {
      type: String,
      required: true
  }
  });

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", UserSchema);