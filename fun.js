const express = require("express");
const Joi = require("joi");
const mysql = require("mysql");

const app = express();
app.use(express.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "task"
});

con.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("mysql connected");
}
});

module.exports = {
queryFunction: (query, data) => new Promise((resolve, reject) => {
    con.query(query, data, (err, result) => {
      if (err)
        reject(err);
      else
        resolve(result);
    }
    );
  })
};