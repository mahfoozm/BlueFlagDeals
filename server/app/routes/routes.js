module.exports = app => {
    const posts = require("../controllers/controller.js");
  
    var router = require("express").Router();
  
    // create a new post
    router.post("/", posts.create);
  
    // retrieve all posts
    router.get("/", posts.findAll);
  
    // retrieve all published posts
    router.get("/published", posts.findAllPublished);
  
    // retrieve a single post with id
    router.get("/:id", posts.findOne);
  
    // edit a post with id
    router.put("/:id", posts.update);
  
    // delete a post with id
    router.delete("/:id", posts.delete);
  
    // delete all posts
    router.delete("/", posts.deleteAll);
  
    app.use('/api/posts', router);
  };