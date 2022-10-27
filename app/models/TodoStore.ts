import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { Todo, TodoModel } from "./TodoModel";

export const TodoStoreModel = types
  .model("TodoStore")
  .props({
    todos: types.array(TodoModel),
  })
  .views((store) => ({
    get currenTodos() {
      return store.todos
    },
  }))
  .actions((store) => ({
    setCurrentTodos(todo: Todo) {
      store.todos.push(todo);
    },
    removeTodo(todo: Todo) {
      store.todos.remove(todo);
    },
  }))

export interface TodoStore extends Instance<typeof TodoStoreModel> {}
export interface TodoStoreSnapshot extends SnapshotOut<typeof TodoStoreModel> {}

// @demo remove-file

