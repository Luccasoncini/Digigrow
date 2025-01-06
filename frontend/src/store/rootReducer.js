// store/rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import { taskReducer } from "../redux/taskSlice";

// Combina todos os reducers
const rootReducer = combineReducers({
  task: taskReducer,
});

export default rootReducer;
