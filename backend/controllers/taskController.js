const Task = require("../models/task");

exports.getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
};

exports.getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.send(task);
};

exports.createTask = async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
  });
  await task.save();
  res.send(task);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send({ message: "Tarefa deletada com sucesso" });
};
