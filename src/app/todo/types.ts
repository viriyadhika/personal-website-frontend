export type TodoResponse = {
  id: number;
  desc: string;
  created_by: string;
  is_done: boolean;
  todos: Array<TodoResponse>;
};
