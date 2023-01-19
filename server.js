const express = require("express");

const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
const origin = req.headers.origin;

res.setHeader("Access-Control-Allow-Origin", origin || "*");
res.setHeader(
  "Access-Control-Allow-Methods",
  "POST, GET, PUT, DELETE, OPTIONS, XMODIFY"
);
res.setHeader("Access-Control-Allow-Credentials", "true");
res.setHeader("Access-Control-Max-Age", "86400");
res.setHeader(
  "Access-Control-Allow-Headers",
  "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
);
app.use(express.json());
app.use(bodyParser.json());

const dbURI =
  "mongodb+srv://satwik12:satwik12@cluster0.zhqihgx.mongodb.net/test";
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

app.get("/", (req, res) => {
  res.send("lol");
});

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
