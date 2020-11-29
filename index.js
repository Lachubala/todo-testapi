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
const tag = new Promise((resolve, reject) => {
  app.get("/api/tags", (req, res) => {
    con.query("SELECT * FROM tag", (err, result) => {
        if (err)
          throw (err);
        res.send(result);
      });
  });
});

tag
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });


//retrun todos
const todo = new Promise((resolve, reject) => {
  app.get("/api/todos", (req, res) => {
    con.query("SELECT * FROM todo", function (err, result) {
      if (err) throw(err);
      res.send(result);
    });
  });
});

todo
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

//get tag
const gettag = new Promise((resolve, reject) => {
  app.get("/api/tags/:id", (req, res) => {
    con.query(
      "SELECT * FROM tag WHERE id= ?",
      [req.params.id],
      async (err, result, fields) => res.end(JSON.stringify(result))
    );
  });
});

gettag
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

//put tag
const puttag = new Promise((resolve, reject) => {
  app.put("/api/tags/:id", (req, res) => {
    con.query(
      "update tag set name = ?, description = ? where id = ?",
      [req.body.name, req.body.description, req.params.id],
      async (err, result, fields) => res.end(JSON.stringify(result))
    );
  });
});

puttag
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

//post tags
const posttag = new Promise((resolve, reject) => {
  app.post("/api/tags", (req, res) => {
    con.query(
      "INSERT INTO tag(name,description) VALUES (?,?) ",
      [req.body.name, req.body.description],
      async (err, result, fields) => res.end(JSON.stringify(result))
    );
  });
});

posttag
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

//delete tags
const deletetag = new Promise((resolve, reject) => {
  app.delete("/api/tags/:id", (req, res) => {
    con.query(
      "DELETE FROM tag WHERE id= ?",
      [req.params.id],
      async (err, result, fields) => res.end(JSON.stringify(result))
    );
  });
});

deletetag
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

// get todos

const gettodo = new Promise((resolve, reject) => {
  app.get("/api/todos/:id", (req, res) => {
    con.query(
      "SELECT * FROM todo WHERE id= ?",
      [req.params.id],
      async (err, result, fields) => res.end(JSON.stringify(result))
    );
  });
});

gettodo
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

//put todos
const puttodo = new Promise((resolve, reject) => {
  app.put("/api/todos/:id", (req, res) => {
    con.query(
      "UPDATE todo SET name = ?,description = ?,content = ? WHERE todo.id = ?",
      [req.body.name, req.body.description, req.body.content, req.params.id],
      async (err, result, fields) => res.end(JSON.stringify(result))
    );
  });
});

puttodo
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

//post todos
const posttodo = new Promise((resolve, reject) => {
  app.post("/api/todos", (req, res) => {
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
            async (err, result, fields) => res.end(JSON.stringify(result))
          );
        } else {
          res.send("tag id not found");
        }
      }
    );
  });
});

posttag
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

//delete todos
const deletetodo = new Promise((resolve, reject) => {
  app.delete("/api/todos/:id", (req, res) => {
    con.query(
      "DELETE FROM todo WHERE id= ?",
      [req.params.id],
      async (err, result, fields) => res.end(JSON.stringify(result))
    );
  });
});

deletetodo
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
