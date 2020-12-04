const { response } = require("express");
const express = require("express");
const Joi = require("joi");
const mysql = require("mysql");

const fun = require('../todo-testapi/fun')
const app = express();
app.use(express.json());

const port = process.env.PORT || 3040;
app.listen(port, () => console.log("listening port " + port));

//return tag
app.get("/api/tags",async (req, res) => {
  try{
      const result = await fun.gettag(req);
      res.send(result);
  }
  catch(error){
      res.send(error);
  }
});

//retrun todos
app.get("/api/todos",async (req, res) => {
    try{
        const result = await fun.gettodo(req);
        res.send(result);
    }
    catch(error){
        res.send(error);
    }
});

//get tag
app.get("/api/tags/:id", async(req, res) => {
  try{
      const result = await fun.gettagbyid(req);
      res.send(result);
  }
  catch(error){
    res.end(error);
  }
});

//put tag
app.put("/api/tags/:id", async(req, res) => {
  try{
      const result = await fun.puttag(req);
      res.send(result);
  }
  catch(error){
    res.end(error);
  }
});

//post tags
app.post("/api/tags", async(req, res) => {
  try{
      const result = await fun.posttag(req);
      res.send(result);
  }
  catch(error){
    res.end(error);
  }
});

//delete tags
app.delete("/api/tags/:id", async(req, res) => {
  try{
      const result = await fun.deletetag(req);
      res.send(result);
  }
  catch(error){
    res.end(error);
  }
});

// get todos
app.get("/api/todos/:id", async(req, res) => {
  try{
      const result = await fun.gettodobyid(req);
      res.send(result);
  }
  catch(error){
    res.end(error);
  }
});

//put todos
app.put("/api/todos/:id", async(req, res) => {
  try{
      const result = await fun.puttodo(req);
      res.send(result);
  }
  catch(error){
    res.end(error);
  }
});

//post todos
app.post("/api/todos", async(req, res) => {
  try{
      const result = await fun.posttodo(req);
      res.send(result);
  }
  catch(error){
    res.end(error);
  }
});

//delete todos
app.delete("/api/todos/:id", async(req, res) => {
  try{
      const result = await fun.deletetodo(req);
      res.send(result);
  }
  catch(error){
    res.end(error);
  }
});
