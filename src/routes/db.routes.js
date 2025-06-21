// src/routes/db.routes.js
const express = require("express");
const router = express.Router();
const { queryHandler, updateHandler } = require("../controllers/db.controller");

router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Oracle DB microservice!" });
});

router.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

router.get("/status", (req, res) => {
  res.status(200).json({ status: "Service is running" });
});

router.post("/query", queryHandler);

router.post("/update", updateHandler);

module.exports = router;
