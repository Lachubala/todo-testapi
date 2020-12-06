const { response } = require("express");
const express = require("express");
const Joi = require("joi");
const mysql = require("mysql");

const fun = require('../todo-testapi/fun')
const app = express();
app.use(express.json());

const port = process.env.PORT || 3060;
app.listen(port, () => console.log("listening port " + port));

//return tag
app.get("/api/tags",async (req, res) => {
  try{
      const result = await fun.queryFunction("SELECT * FROM tag");
      res.send(result);
  }
  catch(error){
      res.send(error);
  }
});

//retrun todos
app.get("/api/todos",async (req, res) => {
    try{
      let condition ="";
      if(req.query.name){
        let tagResult = await fun.queryFunction("SELECT * FROM tag WHERE name= ?",req.query.name);
        if(tagResult.length > 0){
          condition =' WHERE tag_id =' + tagResult[0].id ;
        }else{
          throw error("invalid tag")
        }
      }
        const result = await fun.queryFunction("SELECT * FROM todo"+condition);
        res.send(result);
    }
    catch(error){
        res.send(error);
    }
});

//get tag
app.get("/api/tags/:id", async(req, res) => {
  try{
      const result = await fun.queryFunction(
        "SELECT * FROM tag WHERE id= ?",
        [req.params.id]
      );
      res.send(result);
  }
  catch(error){
    res.end(error);
  }
});

//put tag
app.put("/api/tags/:id", async(req, res) => {
  try{
      const result = await fun.queryFunction(
        "update tag set name = ?, description = ? where id = ?",
        [req.body.name, req.body.description, req.params.id]
      );
      res.send(result);
  }
  catch(error){
    res.end(error);
  }
});

//post tags
app.post("/api/tags", async(req, res) => {
  try{
      const result = await fun.queryFunction(
        "INSERT INTO tag(name,description) VALUES (?,?) ",
        [req.body.name, req.body.description]
      );
      res.send(result);
  }
  catch(error){
    res.end(error);
  }
});

//delete tags
app.delete("/api/tags/:id", async(req, res) => {
  try{
      const result = await fun.queryFunction(
        "DELETE FROM tag WHERE id= ?",
        [req.params.id]
      );
      res.send(result);
  }
  catch(error){
    res.end(error);
  }
});

// get todos
app.get("/api/todos/:id", async(req, res) => {
  try{
      const result = await fun.queryFunction(
        "SELECT * FROM todo WHERE id= ?",
        [req.params.id]
      );
      res.send(result);
  }
  catch(error){
    res.end(error);
  }
});

//put todos
app.put("/api/todos/:id", async(req, res) => {
  try{
      const result = await fun.queryFunction(
        "UPDATE todo SET name = ?,description = ?,content = ? WHERE todo.id = ?",
        [req.body.name, req.body.description, req.body.content, req.params.id]
      );
      res.send(result);
  }
  catch(error){
    res.end(error);
  }
});

//post todos
app.post("/api/todos", async(req, res) => {
  try{
    const result1 = await fun.queryFunction(
      "SELECT * FROM todo WHERE id= ?",
      [req.body.tag_id]
    )
    if(result1.length > 0) {
      const result = await fun.queryFunction(
        "INSERT INTO todo(name,description,content,tag_id) VALUES (?,?,?,?) ",
        [
          req.body.name,
          req.body.description,
          req.body.content,
          req.body.tag_id,
        ]);
        res.send(result);
      }
    res.send(result1);
  }
  catch(error){
    res.end(error);
  }
});

//delete todos
app.delete("/api/todos/:id", async(req, res) => {
  try{
      const result = await fun.queryFunction(
        "DELETE FROM todo WHERE id= ?",
        [req.params.id]
      );
      res.send(result);
  }
  catch(error){
    res.end(error);
  }
});
