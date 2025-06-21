const express = require("express");
const cors = require("cors");
const app = express();
const dbRoutes = require("./routes/db.routes");

// Libera CORS
app.use(cors());

// Middleware para aceitar JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Bem-vindo ao microserviço Oracle DB!" });
});

// Rotas
app.use("/db", dbRoutes);

module.exports = app;
