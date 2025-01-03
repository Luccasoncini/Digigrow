import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";
import { ArrowBackIcon } from "../images/ArrowBackIcon";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const fetchTask = async () => {
    try {
      const response = await api.get(`/${id}`);
      setTitle(response.data.title);
      setDescription(response.data.description);
    } catch (error) {
      toast.error("Erro ao carregar a tarefa.");
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

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

  const handleUpdateTask = async () => {
    if (validate()) {
      try {
        await api.put(`/${id}`, { title, description });
        toast.success("Tarefa atualizada com sucesso!");
        navigate("/");
        setErrors({});
      } catch (error) {
        toast.error("Erro ao atualizar a tarefa.");
      }
    }
  };

  return (
    <div className="App" style={{ position: "relative" }}>
      <h1>Editar Tarefa</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
        />

        <button onClick={() => navigate("/")} className="return-button">
          <ArrowBackIcon size="24" />
        </button>
        <button onClick={handleUpdateTask}>Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditTask;
