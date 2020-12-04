const { response } = require("express");
const express = require("express");
const Joi = require("joi");
const mysql = require("mysql");

const fun = require('../todo-testapi/fun')
const app = express();
app.use(express.json());

const port = process.env.PORT || 3050;
app.listen(port, () => console.log("listening port " + port));

//return tag
app.get("/api/tags", (req, res) => {
  fun.gettag(req)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error)
    });
});

//retrun todos
app.get("/api/todos", (req, res) => {
    fun.gettodo(req)
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
app.get("/api/tags/:id", (req, res) => {
    fun.gettagbyid(req)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

//put tag
  app.put("/api/tags/:id", (req, res) => {
    fun.puttag(req)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.end(error);
    });
});

//post tags
  app.post("/api/tags", (req, res) => {
    fun.posttag(req)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.end(error);
    });
});
  
//delete tags
app.delete("/api/tags/:id", (req, res) => {
    fun.deletetag(req)
    .then((result) => {
      res.end(JSON.stringify(result));
    })
    .catch((error) => {
      res.end(error);
    });
});
// get todos
app.get("/api/todos/:id", (req, res) => {
    fun.gettodobyid(req)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

//put todos
  app.put("/api/todos/:id", (req, res) => {
    fun.puttodo(req)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

//post todos
  app.post("/api/todos", (req, res) => {
    fun.posttodo(req)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.end(error);
    });
});

//delete todos
app.delete("/api/todos/:id", (req, res) => {
    fun.deletetodo(req)
    .then((result) => {
      res.end(JSON.stringify(result));
    })
    .catch((error) => {
      res.end(error);
    });
});
