const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/tasks", taskRoutes);

const PORT = process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
});
