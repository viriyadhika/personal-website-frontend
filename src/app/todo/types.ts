export type TodoResponse = {
  id: number;
  desc: string;
  created_by: string;
  is_done: boolean;
  done_date: string;
  todos: Array<TodoResponse>;
  priority: number
};
