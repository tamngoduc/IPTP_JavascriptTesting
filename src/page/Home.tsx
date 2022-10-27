import { useEffect, useState } from "react";
import { Todo } from "../interface/todo";
import todoAPI from "../service/todoAPI";
import { useNavigate } from "react-router-dom";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { FadeLoader } from "react-spinners";

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [sorted, setSorted] = useState<{ sorted: String; reversed: boolean }>({
    sorted: "id",
    reversed: false,
  });

  const [normal, setNormal] = useState<Boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    getTodosList();
  }, []);

  const getTodosList = async () => {
    try {
      const data = await todoAPI.getTodosList();
      if (data.length > 0) {
        setTodos(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sortById = () => {
    const todosCopy: Todo[] = [...todos];
    todosCopy.sort((todoA: Todo, todoB: Todo) => {
      if (sorted.reversed) {
        return todoA.id - todoB.id;
      }
      return todoB.id - todoA.id;
    });
    setTodos(todosCopy);
    setSorted({ sorted: "id", reversed: !sorted.reversed });
  };

  const sortByTitle = () => {
    const todosCopy: Todo[] = [...todos];
    todosCopy.sort((todoA: Todo, todoB: Todo) => {
      if (sorted.reversed) {
        return todoB.title.localeCompare(todoA.title);
      }
      return todoA.title.localeCompare(todoB.title);
    });
    setTodos(todosCopy);
    setSorted({ sorted: "title", reversed: !sorted.reversed });
  };

  const renderTodosNormal = () => {
    return todos.map((todo: Todo) => {
      return (
        <tr key={todo.id}>
          <td>{todo.id}</td>
          <td>{todo.userId}</td>
          <td>{todo.title}</td>
          <td>
            <button
              id="detail"
              className="btn btn-warning"
              onClick={() => {
                navigate(`/details/${todo.id}`);
              }}
            >
              View Details
            </button>
          </td>
        </tr>
      );
    });
  };

  const groupTodos = (todos: Todo[]) => {
    const userIds: number[] = [];
    todos.forEach((todo) => {
      if (!userIds.includes(todo.userId)) {
        userIds.push(todo.userId);
      }
    });
    const groupedTodos: { userId: number; titles: string[] }[] = [];
    userIds.forEach((userId) => {
      const titles: string[] = [];
      todos.forEach((todo) => {
        if (todo.userId === userId) {
          titles.push(todo.title);
        }
      });
      groupedTodos.push({ userId, titles });
    });
    return groupedTodos;
  };

  const renerTodosUserId = () => {
    const groupedTodos = groupTodos(todos);
    return groupedTodos.map((todo) => {
      return (
        <tr key={todo.userId}>
          <td>{todo.userId}</td>
          <td>
            <ul>
              {todo.titles.map((title) => {
                return <li key={title}>{title}</li>;
              })}
            </ul>
          </td>
        </tr>
      );
    });
  };

  const renderArrow = () => {
    if (sorted.reversed) {
      return <FaArrowUp />;
    }
    return <FaArrowDown />;
  };

  return (
    <div className="App">
      {todos.length ? (
        <div className="table-container">
          <button
            className="btn btn-primary mr-1 my-1"
            onClick={() => {
              setNormal(true);
            }}
          >
            View Normal
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              setNormal(false);
            }}
          >
            Group by User ID
          </button>
          {normal ? (
            <table>
              <thead>
                <tr>
                  <th id="id" onClick={sortById}>
                    <span style={{ marginRight: 10 }}>Id</span>
                    {sorted.sorted === "id" ? renderArrow() : null}
                  </th>
                  <th>
                    <span>User ID</span>
                  </th>
                  <th id="title" onClick={sortByTitle}>
                    <span style={{ marginRight: 10 }}>Title</span>
                    {sorted.sorted === "title" ? renderArrow() : null}
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{renderTodosNormal()}</tbody>
            </table>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>
                    <span style={{ marginRight: 10 }}>User ID</span>
                  </th>
                  <th>
                    <span style={{ marginRight: 10 }}>Title</span>
                  </th>
                </tr>
              </thead>
              <tbody>{renerTodosUserId()}</tbody>
            </table>
          )}
        </div>
      ) : (
        <FadeLoader
          color="#2e1c86"
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

export default Home;
