const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {});

router.post("/", (req, res) => {
  res.send("create user");
});

router
  .route("/:id")
  .get((req, res) => {
    req.params.id;
    res.send(`user get ${req.params.id}`);
  })
  .put((req, res) => {
    req.params.id;
    res.send(`user get ${req.params.id}`);
  })
  .delete((req, res) => {
    req.params.id;
    res.send(`user get ${req.params.id}`);
  });

router.param("id", (req, res, next, id) => {
  console.log(id);
  next();
});

module.exports = router;
