const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { UserRoutes } = require("./Routes/User.routes");
const { connection } = require("./db");
const { PostRoutes } = require("./Routes/Post.routes");
const { BlacklistModel } = require("./Model/Blacklist.model");

const server = express();

server.use(express.json());

server.use(cors());

server.use("/users", UserRoutes);
server.use("/posts", PostRoutes);

server.get("/logout", async (req, res) => {
  try {
    const blacklist = BlacklistModel({ token: req.headers.token });
    await blacklist.save();
    res.status(200).json({ msg: "logged Out" });
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
});

server.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`server is running on ${process.env.port} and connected to DB`);
  } catch (error) {
    console.log(error);
  }
});
