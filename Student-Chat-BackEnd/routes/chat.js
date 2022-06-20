const router = require("express").Router();
const multer = require("multer");
const { recieveMessage, getAllMessages } = require("../controllers/chat");

const upload = multer({ dest: "uploads/" });
const varify = require("../middlewares/verify");

router.post("/sendmessage", varify, upload.single("file"), recieveMessage);
router.post("/getallmessages", varify, getAllMessages);

module.exports = router;
