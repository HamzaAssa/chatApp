const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Group = require("../models/group");

const path = require("path");
const fs = require("fs");

exports.logIn = async (req, res) => {
  // await User.deleteMany();
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid Email or Password" });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid Email or Password" });
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_CODE, {
      expiresIn: "24h",
    });
    res.status(200).json({
      auth: {
        user,
        token,
      },
      message: "Login successfull. Redicrecting to Home page",
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
exports.register = async (req, res) => {
  const data = req.body;
  try {
    const user = await User.findOne({ email: data.email });
    console.log(data.email);
    if (user)
      return res
        .status(400)
        .json({ message: "This account is already registered" });
    if (data.password !== data.confirmPassword)
      return res.status(400).json({ message: "Passwords don't match" });
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const createdUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      groups: [],
    });
    const token = jwt.sign(
      { _id: createdUser._id },
      process.env.JWT_SECRET_CODE,
      {
        expiresIn: "24h",
      }
    );
    res.status(201).json({
      auth: {
        user: createdUser,
        token,
      },
      message: "Login successfull. Redicrecting to Home page",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

exports.changeAvatar = async (req, res) => {
  const { id } = req.body;
  let iconPath = "";
  try {
    const targetPath = path.join(
      __dirname,
      `../uploads/avatars/${req.file.filename}${path.extname(
        req.file.originalname
      )}`
    );

    fs.rename(req.file.path, targetPath, (err) => {
      if (err)
        return res
          .status(500)
          .contentType("application/json")
          .json({ message: "Something Went wrong." });
    });
    iconPath = `user/avatars/${req.file.filename}${path.extname(
      req.file.originalname
    )}`;

    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        avatarSrc: iconPath,
      }
    );
    let toDeletePath = updatedUser.avatarSrc;
    toDeletePath = toDeletePath.replace("user", "uploads");
    fs.unlink(toDeletePath, (err) => {
      if (err) {
        console.log("Error happened");
      }
    });
    const foundUser = await User.findById({ _id: id });
    const tempUpdatedGroups = await Group.updateMany(
      { name: { $in: foundUser.groups } },
      {
        $pull: {
          members: { _id: foundUser._id },
        },
      }
    );
    const updatedGroups = await Group.updateMany(
      { name: { $in: foundUser.groups } },
      {
        $push: {
          members: foundUser,
        },
      }
    );
    res.status(200).contentType("application/json").json(foundUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wong." });
  }
};
