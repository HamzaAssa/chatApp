const Message = require("../models/message");
const path = require("path");
const fs = require("fs");
var mime = require("mime-types");

const recieveMessage = async (req, res) => {
  let filePath = "";
  let type = "";
  const { text, author, groupName } = req.body;
  if (req.file) {
    const targetPath = path.join(
      __dirname,
      `../uploads/${req.file.filename}${path.extname(req.file.originalname)}`
    );

    fs.rename(req.file.path, targetPath, (err) => {
      if (err)
        return res
          .status(500)
          .contentType("application/json")
          .json({ message: "Something Went wrong." });
    });
    filePath = `message/images/${req.file.filename}${path.extname(
      req.file.originalname
    )}`;
    type = mime.lookup(filePath);
    const index = type.indexOf("/");
    type = type.substring(0, index);
    switch (type) {
      case "image":
        type = "img";
        break;
      case "video":
        type = "video";
        break;
      case "audio":
        type = "audio";
        break;
      default:
        type = "Document";
        break;
    }
  }

  const savedMessage = await Message.create({
    author: author,
    groupName: groupName,
    text: text,
    filePath: filePath,
    fileType: type,
  });

  res.status(200).contentType("application/json").json(savedMessage);
};

const getAllMessages = async (req, res) => {
  const { groupName } = req.body;
  try {
    const gottenMessages = await Message.find({ groupName: groupName });
    res.status(200).contentType("application/json").json(gottenMessages);
  } catch (err) {
    res
      .status(500)
      .contentType("application/json")
      .json({ message: "Something went wrong please try again!" });
  }
};

module.exports = {
  recieveMessage,
  getAllMessages,
};
