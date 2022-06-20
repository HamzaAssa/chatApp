const mongoose = require("mongoose");
const moment = require("moment");
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 1,
    max: 255,
  },
  lastName: {
    type: String,
    required: false,
    min: 1,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  avatarSrc: {
    type: String,
    default: "/static/images/avatar/2.jpg",
  },
  groups: {
    type: [String],
  },
  date: {
    type: Date,
    default: moment().format("YYYY M DD, h:mm:ss a"),
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
