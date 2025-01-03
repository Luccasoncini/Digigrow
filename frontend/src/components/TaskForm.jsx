import { useState } from "react";
import { toast } from "react-toastify";

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const validate = () => {
    if (!title.trim()) {
      toast.error("O título não pode ser vazio.");
      return false;
    }
    if (description.length > 255) {
      toast.error("A descrição não pode ter mais de 255 caracteres.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        onAddTask({ title, description });
        toast.success("Tarefa adicionada com sucesso!");
        setTitle("");
        setDescription("");
      } catch (error) {
        toast.error("Erro ao adicionar a tarefa.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Título*"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength="255"
      />
      <button type="submit">Adicionar Tarefa</button>
    </form>
  );
};

export default TaskForm;
