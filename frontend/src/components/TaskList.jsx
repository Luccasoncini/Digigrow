import TaskItem from "./TaskItem";
import { useSelector } from "react-redux";

function TaskList() {
  const tasks = useSelector((state) => state.task.tasks);

  return (
    <div className="task-list">
      {Array.isArray(tasks) &&
        tasks.map((task) => <TaskItem key={task._id} task={task} />)}
    </div>
  );
}

export default TaskList;
