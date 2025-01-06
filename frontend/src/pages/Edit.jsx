import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "../images/ArrowBackIcon";
import { useDispatch, useSelector } from "react-redux";
import { editTask, fetchTask, onChangeEditValue } from "../redux/taskSlice";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const task = useSelector((state) => state.task.editTask);

  useEffect(() => {
    dispatch(fetchTask(id));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(
      editTask({ id, title: task.title, description: task.description })
    );

    if (editTask.fulfilled.match(resultAction)) {
      navigate("/");
    }
  };

  return (
    <div className="App" style={{ position: "relative" }}>
      <h1>Editar Tarefa</h1>
      <button onClick={() => navigate("/")} className="return-button">
        <ArrowBackIcon size="24" />
      </button>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={task.title}
          onChange={(e) =>
            dispatch(onChangeEditValue(["title", e.target.value]))
          }
          placeholder="Título"
        />
        <textarea
          value={task.description}
          onChange={(e) =>
            dispatch(onChangeEditValue(["description", e.target.value]))
          }
          placeholder="Descrição"
        />

        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditTask;
