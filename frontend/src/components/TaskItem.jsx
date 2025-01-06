import { EditIcon } from "../images/EditIcon";
import { DeleteIcon } from "../images/DeleteIcon";
import { useNavigate } from "react-router-dom";
import { deleteTask } from "../redux/taskSlice";
import { useDispatch } from "react-redux";

function TaskItem({ task }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
          <div onClick={() => dispatch(deleteTask(task._id))}>
            <DeleteIcon size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
