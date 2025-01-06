const mongoose = require("mongoose");

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

module.exports = Task;
