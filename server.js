require("dotenv").config();
const express = require("express");
const middleware = require("./middleware");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(middleware.cors);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
  next();
});
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const dbURI =
  "mongodb+srv://satwik12:satwik12@cluster0.zhqihgx.mongodb.net/test";

// const dbURI = "mongodb://localhost/blogApp";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Done");
  })
  .catch((e) => console.log(e));

const RegisterFormSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  msg: String,
  contact: String,
  year: String,
  branch: String,
  enrollment: String,
  codeforces: String,
});

const RegisterForm = mongoose.model("RegisterForm", RegisterFormSchema);

app.post("/register", async (req, res) => {
  const Register = new RegisterForm({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    msg: req.body.msg,
    contact: req.body.contact,
    year: req.body.year,
    branch: req.body.branch,
    enrollment: req.body.enrollment,
    codeforces: req.body.codeforces,
  });

  await Register.save();
  res.json(Register);
});

const port = process.env.PORT || 1337;

app.listen(port);
