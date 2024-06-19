import { useState } from "react";
import { trpc } from "../utils/trpc";

const TodoList = () => {
  const [text, setText] = useState("");

  const { data: todos, refetch: refetchTodos } = trpc.todo.list.useQuery();
  const addTodoMutation = trpc.todo.add.useMutation({
    onSuccess: () => {
      refetchTodos();
    },
  });
  const completeTodoMutation = trpc.todo.complete.useMutation({
    onSuccess: () => {
      refetchTodos();
    },
  });

  const handleAddTodo = () => {
    addTodoMutation.mutate({ text });
    setText("");
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {(todos || []).map((todo: any) => (
          <li key={todo.id}>
            {todo.text}
            {!todo.completed && (
              <button
                onClick={() => completeTodoMutation.mutate({ id: todo.id })}
              >
                Complete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { TodoList };
