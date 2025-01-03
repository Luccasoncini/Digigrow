import React, { useEffect, useState } from "react";
import api from "../api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import "../App.scss";

function Home() {
  const [tasks, setTasks] = useState([]);

  // Carregar tarefas
  const fetchTasks = async () => {
    const response = await api.get("/");
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Adicionar tarefa
  const addTask = async (task) => {
    await api.post("/", task);
    fetchTasks();
  };

  // Excluir tarefa
  const deleteTask = async (id) => {
    await api.delete(`/${id}`);
    fetchTasks();
  };

  return (
    <div className="App">
      <h1>Lista de tarefas</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} onDeleteTask={deleteTask} />
    </div>
  );
}

export default Home;
