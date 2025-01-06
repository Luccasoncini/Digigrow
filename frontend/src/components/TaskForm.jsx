import { useDispatch, useSelector } from "react-redux";
import { addTask, onChangeAddValue } from "../redux/taskSlice";

export const TaskForm = () => {
  const dispatch = useDispatch();
  const task = useSelector((state) => state.task.addTask);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addTask({ title: task.title, description: task.description }));
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        placeholder="Título*"
        type="text"
        value={task.title}
        onChange={(e) => dispatch(onChangeAddValue(["title", e.target.value]))}
      />
      <textarea
        placeholder="Descrição"
        value={task.description}
        onChange={(e) =>
          dispatch(onChangeAddValue(["description", e.target.value]))
        }
        maxLength="255"
      />
      <button type="submit">Adicionar Tarefa</button>
    </form>
  );
};

export default TaskForm;
