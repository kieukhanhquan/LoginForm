const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const jwt = require("jsonwebtoken")
const app = express();

app.use(cors());
app.use(express.json());

// database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "login",
  port: 3307
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.post("/signup", (req, res) => {
  const sql = "INSERT INTO user (`email`,`password`) VALUES (?)";
  const values=[
    req.body.email,
    req.body.password,
  ]
  console.log(values);
  db.query(sql, [values],(err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json("Success");
  })

})

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM user WHERE `email`=? AND `password`=?"; 
  const values=[
    req.body.email,
    req.body.password,
  ]
  console.log(values);
  db.query(sql, [req.body.email,req.body.password],(err, data) => {
    if (err) {
      return res.json(err);
    }
    if(data.length>0){
      return res.json("Success");
    }
    else{
      return res.json("Failure");
    }
  })

})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
