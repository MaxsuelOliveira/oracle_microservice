const express = require("express");
const cors = require("cors");
const app = express();
const dbRoutes = require("./routes/db.routes");

// Libera CORS
app.use(cors());

// Middleware para aceitar JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Oracle DB microservice!" });
});

// Rotas
app.use("/db", dbRoutes);

module.exports = app;
