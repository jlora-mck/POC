import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";

export const TodoModel = types
  .model("Todo")
  .props({
    name: types.maybe(types.string),
    isCompleted: types.optional(types.boolean, false)
  })
  .views((store) => ({
    get currentName() {
      return store.name
    },
    get isTaskCompleted() {
      return store.isCompleted
    },
  }))
  .actions((store) => ({
    setCurrentName(name?: string) {
      store.name = name
    },
    setIsCompleted(isCompleted: boolean) {
      store.isCompleted = isCompleted
    },
  }))

export interface Todo extends Instance<typeof TodoModel> {}
export interface TodoSnapshotOut extends SnapshotOut<typeof TodoModel> {}
export interface TodoSnapshotIn extends SnapshotIn<typeof TodoModel> {}
// @demo remove-file

