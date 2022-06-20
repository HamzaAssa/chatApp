const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
/// GEROUNAL MIDDLEWARES
app.use(
  cors({
    origin: process.env.CORS_URL,
    optionsSuccessStatus: 200, // For legacy browsers
  })
);
app.use(express.json());
app.use("/message/images", express.static("./uploads"));
app.use("/user/avatars", express.static("./uploads/avatars"));
app.use("/group/avatars", express.static("./uploads/avatars"));
/// ROUTES MIDDLEWARES
const userRoute = require("./routes/user");
app.use("/user", userRoute);
const chatRoute = require("./routes/chat");
app.use("/chat", chatRoute);
const groupRoute = require("./routes/group");
app.use("/group", groupRoute);

app.get("/", (req, res) =>
  res.status(200).send(`<a href=${process.env.CORS_URL} >Student Chat</a>`)
);

const PORT = process.env.PORT || 9001;
/// DB CONNECTION
mongoose
  .connect(
    process.env.CONNCETION_URL,
    async (err) => {
      app.listen(PORT, () =>
        console.log(`Server is listening on http://localhost:${PORT}`)
      );
    },
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log(`MDB is conncected on ${process.env.CONNCETION_URL}`))
  .catch((err) => console.log(err));
/// APP LISTEN
