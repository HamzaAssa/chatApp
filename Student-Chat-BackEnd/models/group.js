const mongoose = require("mongoose");
const moment = require("moment");
const groupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  iconSrc: {
    type: String,
    default: "/static/images/avatar/2.jpg",
  },
  createdAt: {
    type: Date,
    default: moment().format("YYYY M DD"),
  },
  members: {
    type: [Object],
  },
});

const Group = mongoose.model("group", groupSchema);
module.exports = Group;
