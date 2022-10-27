import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Todo } from "../interface/todo";
import todoAPI from "../service/todoAPI";
import { FadeLoader } from "react-spinners";

const Details = () => {
  const [todo, setTodo] = useState<Todo>({
    userId: 0,
    id: 0,
    title: "",
    completed: false,
  });

  const { id }: any = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getTodoDetails(id as number);
  }, [id]);

  const getTodoDetails = async (id: number) => {
    try {
      const data = await todoAPI.getTodoDetails(id);
      if (data.id > 0) {
        setTodo(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {todo.id > 0 ? (
        <div
          className="card text-white bg-secondary mb-3 mx-auto my-auto"
          style={{
            maxWidth: "18rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <div className="card-header">Todo Details</div>
          <div className="card-body">
            <h6 className="card-title">
              Status: {todo.completed ? "Completed" : "Not completed"}
            </h6>
            <h6 className="card-text">ID: {todo.id}</h6>
            <h6 className="card-text">Title: {todo.title}</h6>
            <h6 className="card-text">User ID: {todo.userId}</h6>
            <button
              className="btn btn-success"
              onClick={() => {
                navigate("/");
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
      ) : (
        <FadeLoader
          color="#2e1c86"
          className="mx-auto my-auto"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
      )}
    </div>
  );
};

export default Details;
