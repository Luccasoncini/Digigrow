import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as yup from "yup";
import api from "../api";
import { toast } from "react-toastify";

const taskSchema = yup.object({
  title: yup.string().required("O título não pode ser vazio."),
  description: yup
    .string()
    .max(255, "A descrição não pode ter mais de 255 caracteres."),
});

export const fetchTasks = createAsyncThunk("task/fetchTasks", async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    toast.error("Erro ao carregar a tarefa.");
  }
});
export const fetchTask = createAsyncThunk("task/fetchTask", async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    toast.error("Erro ao carregar a tarefa.");
  }
});
export const addTask = createAsyncThunk(
  "task/addTask",
  async ({ title, description }, { rejectWithValue }) => {
    try {
      taskSchema.validateSync({ title, description });

      const response = await api.post("/", { title, description });
      toast.success("Tarefa adicionada com sucesso!");

      return response.data;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        toast.error(error.message);
        return rejectWithValue(error.message);
      } else {
        toast.error("Erro ao adicionar a tarefa.");
        return rejectWithValue("Erro ao adicionar a tarefa.");
      }
    }
  }
);
export const deleteTask = createAsyncThunk("task/deleteTask", async (id) => {
  try {
    await api.delete(`/${id}`);
    toast.success("Tarefa removida com sucesso!");
    return id;
  } catch (error) {
    toast.error("Erro ao remover a tarefa.");
    return error;
  }
});
export const editTask = createAsyncThunk(
  "task/editTask",
  async ({ id, title, description }, { rejectWithValue }) => {
    try {
      taskSchema.validateSync({ title, description });

      const response = await api.put(`/${id}`, { title, description });
      toast.success("Tarefa editada com sucesso!");
      return response.data;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        toast.error(error.message);
        return rejectWithValue(error.message);
      } else {
        toast.error("Erro ao editar a tarefa.");
        return rejectWithValue("Erro ao adicionar a tarefa.");
      }
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    editTask: {
      title: "",
      description: "",
    },
    addTask: {
      title: "",
      description: "",
    },
  },
  reducers: {
    onChangeEditValue: (state, action) => {
      const [field, value] = action.payload;
      if (state.editTask.hasOwnProperty(field)) {
        state.editTask[field] = value;
      }
    },
    onChangeAddValue: (state, action) => {
      const [field, value] = action.payload;
      if (state.addTask.hasOwnProperty(field)) {
        state.addTask[field] = value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.task = action.payload;

        state.editTask.title = action.payload.title;
        state.editTask.description = action.payload.description;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);

        state.addTask.title = "";
        state.addTask.description = "";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }

        state.editTask.title = "";
        state.editTask.description = "";
      });
  },
});

export const { onChangeEditValue, onChangeAddValue } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
