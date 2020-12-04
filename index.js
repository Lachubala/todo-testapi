const { response } = require("express");
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

const port = process.env.PORT || 3050;
app.listen(port, () => console.log("listening port " + port));

//return tag
function gettag(req) {
  return new Promise((resolve, reject) => {
    con.query("SELECT * FROM tag", (err, result) => {
        if(err) reject(err);
        else resolve(result);
      }
    );
  });
}

app.get("/api/tags", (req, res) => {
    gettag(req)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error)
    });
});

//retrun todos
function gettodo(req) {
  return new Promise((resolve, reject) => {
    con.query("SELECT * FROM todo", (err, result) => {
        if(err) reject(err);
        else resolve(result);
      }
    );
  });
}

app.get("/api/todos", (req, res) => {
    gettodo(req)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.end(JSON.stringify({
        error: error
      }))
    });
});

//get tag
function gettagbyid(req) {
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
}

app.get("/api/tags/:id", (req, res) => {
    gettagbyid(req)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

//put tag
function puttag(req){
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
  }
  app.put("/api/tags/:id", (req, res) => {
    puttag(req)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.end(error);
    });
});

//post tags
function posttag(req){
  return new Promise((resolve,reject)=>{
    con.query("INSERT INTO tag(name,description) VALUES (?,?) ",
    [req.body.name, req.body.description],
    async (err, result, fields) =>{
        if(err) reject(err);
        else resolve(result);
      }
      );
    });
  }
  app.post("/api/tags", (req, res) => {
    posttag(req)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.end(error);
    });
});
  
//delete tags

function deletetodo(req) {
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

app.delete("/api/todos/:id", (req, res) => {
    deletetodo(req)
    .then((result) => {
      res.end(JSON.stringify(result));
    })
    .catch((error) => {
      res.end(error);
    });
});
// get todos
function gettodobyid(req) {
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
}

app.get("/api/todos/:id", (req, res) => {
    gettodobyid(req)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

//put todos
function puttodo(req){
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
  }
  app.put("/api/todos/:id", (req, res) => {
    puttodo(req)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

//post todos
function posttodo(req){
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
  }
  app.post("/api/todos", (req, res) => {
    posttodo(req)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.end(error);
    });
});

//delete todos
function deletetodo(req) {
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

app.delete("/api/todos/:id", (req, res) => {
    deletetodo(req)
    .then((result) => {
      res.end(JSON.stringify(result));
    })
    .catch((error) => {
      res.end(error);
    });
});
