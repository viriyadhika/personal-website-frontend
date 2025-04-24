import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { TodoResponse } from "../types";
import {
  Button,
  Checkbox,
  IconButton,
  Input,
  Menu,
  MenuItem,
} from "@mui/material";
import { useAddTask, useUpdateTask } from "./services";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Reminder from "./reminder";

function useMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return {
    handleClick,
    handleClose,
    open,
    anchorEl,
  };
}

function Task({
  todo,
  onDelete,
}: {
  todo: TodoResponse;
  onDelete: () => void;
}) {
  const [state, setState] = useState({
    checked: todo.is_done,
    input: todo.desc,
  });
  const [subTasks, setSubTasks] = useState(todo.todos);
  const { anchorEl, open, handleClick, handleClose } = useMenu();

  const { changeDesc, deleteTask, changeDone } = useUpdateTask(
    { desc: state.input, is_deleted: false, id: todo.id },
    () => {}
  );

  return (
    <>
      <ListItemButton>
        <ListItemIcon>
          <Checkbox
            checked={state.checked}
            onChange={(e) => {
              setState((cur) => ({ ...cur, checked: e.target.checked }));
              changeDone(e.target.checked);
            }}
          />
        </ListItemIcon>
        <ListItemText
          primary={
            <Input
              value={state.input}
              onChange={(e) => {
                setState((cur) => ({ ...cur, input: e.target.value }));
                changeDesc(e.target.value);
              }}
            />
          }
        />
        <IconButton onClick={handleClick}>
          <MoreHorizIcon />
        </IconButton>
        <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
          <MenuItem>
            <IconButton color="error">
              <DeleteIcon
                onClick={(e) => {
                  if (confirm("Are you sure?")) {
                    deleteTask();
                    onDelete();
                  }
                }}
              />
            </IconButton>
          </MenuItem>
          <MenuItem>
            <Reminder todo_id={todo.id} handleClose={handleClose} />
          </MenuItem>
        </Menu>
      </ListItemButton>
      {subTasks.map((subTask) => {
        <Task
          key={subTask.id}
          todo={subTask}
          onDelete={() => {
            setSubTasks((cur) => cur.filter((item) => item.id !== subTask.id));
          }}
        />;
      })}
    </>
  );
}

export function Group({
  grp,
  onDelete,
}: {
  grp: TodoResponse;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({ checked: grp.is_done, input: grp.desc });
  const [tasks, setTasks] = useState(grp.todos);
  const { mutate } = useAddTask({ parent_task: grp.id }, ({ id }) => {
    setTasks((cur) => [
      ...cur,
      { id, desc: "", created_by: "", is_done: false, todos: [] },
    ]);
  });
  const { changeDesc, deleteTask, changeDone } = useUpdateTask(
    { desc: state.input, is_deleted: false, id: grp.id },
    () => {}
  );

  return (
    <>
      <ListItemButton
        onClick={() => {
          setOpen((o) => !o);
        }}
      >
        <ListItemIcon>
          <Checkbox
            checked={state.checked}
            onChange={(e) => {
              setState((cur) => ({ ...cur, checked: e.target.checked }));
              changeDone(e.target.checked);
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </ListItemIcon>
        <ListItemText
          primary={
            <Input
              value={state.input}
              onChange={(e) => {
                setState((cur) => ({ ...cur, input: e.target.value }));
                changeDesc(e.target.value);
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          }
        />
        <IconButton color="error">
          <DeleteIcon
            onClick={(e) => {
              e.stopPropagation();
              if (confirm("Are you sure?")) {
                deleteTask();
                onDelete();
              }
            }}
          />
        </IconButton>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        <List component="div" disablePadding sx={{ pl: 2 }}>
          {tasks.map((task) => {
            return (
              <Task
                key={task.id}
                todo={task}
                onDelete={() => {
                  setTasks((cur) => cur.filter((item) => item.id !== task.id));
                }}
              />
            );
          })}
          <ListItemButton>
            <Button
              onClick={() => {
                mutate();
              }}
            >
              Add Task
            </Button>
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
}
