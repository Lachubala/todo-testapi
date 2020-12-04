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
gettag  : function(req) {
    return new Promise((resolve, reject) => {
      con.query("SELECT * FROM tag", (err, result) => {
          if(err) reject(err);
          else resolve(result);
        }
      );
    });
  },

gettodo :function(req) {
    return new Promise((resolve, reject) => {
      con.query("SELECT * FROM todo", (err, result) => {
          if(err) reject(err);
          else resolve(result);
        }
      );
    });
  },

gettagbyid : function (req) {
    return new Promise((resolve, reject) => {
      con.query(
        "SELECT * FROM tag WHERE id= ?",
        [req.params.id],
        async (err, result, fields) => {
          if(err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  puttag : function (req){
    return new Promise((resolve,reject)=>{
      con.query(
        "update tag set name = ?, description = ? where id = ?",
        [req.body.name, req.body.description, req.params.id],
        async (err, result, fields) =>{
          if(err) reject(err);
          else resolve(result);
        }
        );
      });
    },

  posttag : function (req) {
    return new Promise((resolve, reject) => {
      con.query("INSERT INTO tag(name,description) VALUES (?,?) ",
        [req.body.name, req.body.description],
        async (err, result, fields) => {
          if (err)
            reject(err);


          else
            resolve(result);
        }
      );
    });
  },

deletetag:function (req) {
    return new Promise((resolve, reject) => {
      con.query(
        "DELETE FROM tag WHERE id= ?",
        [req.params.id],
        (err, result, fields) => {
          if(err) reject(err);
          else resolve(result);
        }
      );
    });
  },


  gettodobyid : function(req) {
    return new Promise((resolve, reject) => {
      con.query(
        "SELECT * FROM todo WHERE id= ?",
        [req.params.id],
        async (err, result, fields) => {
          if(err) reject(err);
          else resolve(result);
        }
      );
    });
  } , 


  puttodo : function (req){
    return new Promise((resolve,reject)=>{
      con.query(
        "UPDATE todo SET name = ?,description = ?,content = ? WHERE todo.id = ?",
        [req.body.name, req.body.description, req.body.content, req.params.id],
        async (err, result, fields) =>{
          if(err) reject(err);
          else resolve(result);
        }
        );
      });
    },

    posttodo : function (req){
        return new Promise((resolve,reject)=>{
          con.query(
            "SELECT id FROM tag WHERE id=?",
            [req.body.tag_id],
            async (err, result, fields) => {
              if (result.length > 0) {
                con.query(
                  "INSERT INTO todo(name,description,content,tag_id) VALUES (?,?,?,?) ",
                  [
                    req.body.name,
                    req.body.description,
                    req.body.content,
                    req.body.tag_id,
                  ],
                  async (err, result, fields) => {
                    if(err) reject(err);
                    else resolve(result);
                  }
                );
              } else {
                console.log("todo id not found");
              }
            }
        );
    });
},

deletetodo : function (req) {
    return new Promise((resolve, reject) => {
        con.query(
            "DELETE FROM todo WHERE id= ?",
            [req.params.id],
            (err, result, fields) => {
                if(err) reject(err);
                else resolve(result);
            }
        );
    });
}
};