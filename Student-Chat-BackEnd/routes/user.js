const multer = require("multer");
const router = require("express").Router();
const { logIn, register, changeAvatar } = require("../controllers/user");
const varify = require("../middlewares/verify");

const upload = multer({ dest: "uploads/avatars/" });

router.post("/login", logIn);
router.post("/register", register);
// router.post("/changeavatar", varify, changeAvatar);
router.post("/changeavatar", varify, upload.single("avatar"), changeAvatar);

module.exports = router;
