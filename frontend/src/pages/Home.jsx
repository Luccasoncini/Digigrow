import { useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import "../App.scss";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../redux/taskSlice";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  return (
    <div className="App">
      <h1>Lista de tarefas</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default Home;
