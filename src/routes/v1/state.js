import express from "express";

const server = express.Router();

server.get("/", async (req, res, next) => {
  let success = req.query.success;
  if (success === "true") {
    res.render("success", { layout: "./layouts/base" });
  } else {
    res.render("failed", { layout: "./layouts/base" });
  }
});

export default server;