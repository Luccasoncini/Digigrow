const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Importa o CORS

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "O título é obrigatório"],
      trim: true,
    },
    description: {
      type: String,
      maxlength: [255, "A descrição deve ter no máximo 255 caracteres"],
      trim: true,
    },
  },
  { collection: "tasksCollection" }
);

const Task = mongoose.model("Task", taskSchema);

const app = express();
app.use(cors()); // Habilita o CORS para todas as origens
app.use(express.json());
const port = 3000;

//Metodo de listagem
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  return res.send(tasks);
});

app.get("/tasks/:id", async (req, res) => {
  const tasks = await Task.findById(req.params.id);
  return res.send(tasks);
});

//Metodo de excluir
app.delete("/tasks/:id", async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  return res.send(task);
});

//Metodo de atualizar
app.put("/tasks/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
  });
  return res.send(task);
});

//Metodo de criar
app.post("/tasks", async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
  });
  await task.save();
  return res.send(task);
});

app.listen(port, () => {
  mongoose.connect("mongodb://localhost:27017/Digigrow");
  console.log(`Example app listening on port ${port}`);
});
