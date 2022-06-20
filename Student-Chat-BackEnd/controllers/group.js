const User = require("../models/user");
const Group = require("../models/group");
const path = require("path");
const fs = require("fs");
const createGroup = async (req, res) => {
  const { id, group } = req.body;

  try {
    const foundGroup = await Group.findOne({ name: group });
    if (foundGroup)
      return res.status(400).json({ message: "This group already exists" });

    const joinedUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        $push: {
          groups: group,
        },
      }
    );

    const createdGroup = await Group.create({
      name: group,
      members: joinedUser,
    });

    const returnedUser = await User.findById({ _id: id });
    res
      .status(200)
      .json({ message: "Created Succesffully.", user: returnedUser });
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong!" });
  }
};
const joinGroup = async (req, res) => {
  const { id, group } = req.body;
  try {
    const foundGroup = await Group.findOne({ name: group });
    if (!foundGroup)
      return res.status(404).json({ message: "Group doesn't exist" });
    const foundUser = await User.findById({ _id: id });
    if (foundUser.groups.includes(group))
      return res
        .status(400)
        .json({ message: "You can't join the same group more than once" });

    const joinedUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        $push: {
          groups: group,
        },
      }
    );
    const updatedGroup = await Group.findOneAndUpdate(
      { name: group },
      {
        $push: {
          members: joinedUser,
        },
      }
    );

    const returnedUser = await User.findById({ _id: id });
    res
      .status(200)
      .json({ message: "Joined Succesffully.", user: returnedUser });
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong!" });
  }
};

const findGroups = async (req, res) => {
  const { groupsName } = req.body;

  try {
    let foundGroup = await Group.find({ name: { $in: groupsName } });
    if (foundGroup.length < 1)
      return res
        .status(404)
        .json({ message: "You are not joined to any group." });
    res.status(200).json(foundGroup);
  } catch (err) {
    res.status(500).json({ message: "Something went Wrong" });
  }
};

const deleteGroup = async (req, res) => {
  const { userId, groupId, groupName } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      {
        $pull: {
          groups: groupName,
        },
      }
    );
    const updatedGroup = await Group.findByIdAndUpdate(
      { _id: groupId },
      {
        $pull: {
          members: { _id: updatedUser._id },
        },
      }
    );
    const returnedUser = await User.findById({ _id: updatedUser._id });
    let returnedGroup = await Group.find({
      name: { $in: returnedUser.groups },
    });

    res.status(200).json({
      message: "Group left Succesffully.",
      user: returnedUser,
      groups: returnedGroup,
    });
  } catch (error) {
    res.status(500).json({ message: "Something Went wrong!" });
  }
};

const changeGroupIcon = async (req, res) => {
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
    iconPath = `group/avatars/${req.file.filename}${path.extname(
      req.file.originalname
    )}`;
    const updatedGroup = await Group.findByIdAndUpdate(
      { _id: id },
      {
        iconSrc: iconPath,
      }
    );
    let toDeletePath = updatedGroup.iconSrc;

    toDeletePath = toDeletePath.replace("group", "uploads");
    fs.unlink(toDeletePath, (err) => {
      if (err) {
        console.log("Error happened");
      }
    });
    const foundGroup = await Group.findById({ _id: id });
    res.status(200).contentType("application/json").json(foundGroup);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = {
  createGroup,
  joinGroup,
  findGroups,
  deleteGroup,
  changeGroupIcon,
};
