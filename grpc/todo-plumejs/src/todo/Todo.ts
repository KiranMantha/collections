import { Component, html } from '@plumejs/core';
import { trpc } from '../utils/trpc';

@Component({
  selector: 'app-todo'
})
export class Todo {
  todos = [];
  text = '';

  mount() {
    this.getTodos();
  }

  getTodos() {
    trpc.todo.list.query().then((todos) => {
      this.todos = todos;
    });
  }

  handleAddTodo() {
    trpc.todo.add.mutate({ text: this.text }).then(() => {
      this.getTodos();
    });
    this.text = '';
  }

  handleCompleteTodo(id) {
    trpc.todo.complete.mutate({ id }).then(() => {
      this.getTodos();
    });
  }

  render() {
    return html`<h1>Todo List</h1>
      <input
        value="${this.text}"
        onchange=${(e) => {
          this.text = e.target.value;
        }}
      />
      <button
        onclick=${() => {
          this.handleAddTodo();
        }}
      >
        Add Todo
      </button>
      <ul>
        ${(this.todos || []).map(
          (todo: any) =>
            html`<li key="${todo.id}">
              ${todo.text}
              ${!todo.completed &&
              html`<button
                onclick=${() => {
                  this.handleCompleteTodo(todo.id);
                }}
              >
                Complete
              </button>`}
            </li>`
        )}
      </ul>`;
  }
}
