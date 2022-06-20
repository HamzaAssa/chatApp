const jwt = require("jsonwebtoken");
const verify = (req, res, next) => {
  const token = req.headers.token;
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const varified = jwt.verify(token, process.env.JWT_SECRET_CODE);
    req.user = varified;
    next();
  } catch (err) {
    return res
      .status(400)
      .json({ message: "You have to login before using the application." });
  }
};

module.exports = verify;
