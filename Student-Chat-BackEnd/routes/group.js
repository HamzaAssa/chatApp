const multer = require("multer");
const router = require("express").Router();
const {
  createGroup,
  joinGroup,
  findGroups,
  deleteGroup,
  changeGroupIcon,
} = require("../controllers/group");
const varify = require("../middlewares/verify");

const upload = multer({ dest: "uploads/avatars/" });

router.post("/creategroup", varify, createGroup);
router.post("/joingroup", varify, joinGroup);
router.post("/findgroups", varify, findGroups);
router.post("/deletegroup", varify, deleteGroup);
router.post("/changegroupicon", varify, upload.single("icon"), changeGroupIcon);

module.exports = router;
