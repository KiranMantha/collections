// src/components/TodoList.tsx
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { trpcClient } from "../utils/trpc";

const TodoList = () => {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();
  const todosQuery = trpcClient.todo.list.useQuery();
  const addTodoMutation = trpcClient.todo.add.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(trpcClient.todo.list.getQueryKey());
    },
  });
  const completeTodoMutation = trpcClient.todo.complete.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(trpcClient.todo.list.getQueryKey());
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
        {todosQuery.data?.map((todo: any) => (
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
