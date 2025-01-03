import { EditIcon } from "../images/EditIcon";
import { DeleteIcon } from "../images/DeleteIcon";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function TaskItem({ task, onDeleteTask }) {
  const navigate = useNavigate();

  const handleDeleteTask = (id) => {
    try {
      onDeleteTask(id);
      toast.success("Tarefa removida com sucesso!");
    } catch (error) {
      toast.error("Erro ao remover a tarefa.");
    }
  };

  return (
    <div className="task-item">
      <div className="task-item-header">
        <div className="task-item-content">
          <h4>{task.title}</h4>
        </div>

        <div className="actions">
          <div onClick={() => navigate(`edit/${task._id}`)}>
            <EditIcon size={24} />
          </div>
          <div onClick={() => handleDeleteTask(task._id)}>
            <DeleteIcon size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
