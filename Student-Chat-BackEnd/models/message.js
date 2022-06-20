const mongoose = require("mongoose");
const moment = require("moment");

const messageSchema = mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  groupName: {
    type: String,
    required: true,
  },
  fileType: String,
  text: String,
  filePath: String,
  createdAt: {
    type: Date,
    default: moment(),
    expires: 604800,
  },
});

const Message = mongoose.model("message", messageSchema);
module.exports = Message;
