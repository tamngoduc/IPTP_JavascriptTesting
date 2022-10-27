import axiosClient from "./axiosClient";
import { Todo } from "../interface/todo";

const todoAPI = {
  getTodosList: () => {
    return axiosClient.get<unknown, Todo[]>("todos");
  },

  getTodoDetails: (id: number) => {
    return axiosClient.get<unknown, Todo>(`todos/${id}`);
  },
};

export default todoAPI;
