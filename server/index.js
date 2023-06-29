const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");

const cors = require("cors");

app.use(express.json());

app.use(cors());

mongoose.connect(
  "mongodb+srv://user:1234@cluster0.0yqwtzz.mongodb.net/mern?retryWrites=true&w=majority"
).then((data)=>{
    console.log("Database connected");
});

app.get("/getUsers", (req, res) => {

  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

app.listen(3001, () => {
  console.log("SERVER RUNS PERFECTLY!");
});