import { NEXT_PUBLIC_API_URL } from "@/env/env";
import { debounce, getAuthOptions } from "@/utilities/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";

type AddTodoRequest = {
  parent_task: number | null;
};

export function useAddTask(
  body: AddTodoRequest,
  onSuccess: (response: { id: number }) => void
) {
  return useMutation({
    mutationKey: ["task-add"],
    mutationFn: async () => {
      const response = await axios.post<{ id: number }>(
        `${NEXT_PUBLIC_API_URL}/todo/add`,
        body,
        getAuthOptions()
      );
      return response.data;
    },
    onSuccess,
  });
}

type UpdateTodoRequest = {
  desc: string;
  is_deleted: boolean;
  id: number;
};

export function useUpdateTask(
  current: UpdateTodoRequest,
  onSuccess: () => void
) {
  const { mutate: updateMutate } = useMutation({
    mutationKey: ["task-update"],
    mutationFn: async (rest: { desc: string; is_deleted: boolean }) => {
      const response = await axios.post<UpdateTodoRequest>(
        `${NEXT_PUBLIC_API_URL}/todo/update`,
        { id: current.id, ...rest },
        getAuthOptions()
      );
      return response.data;
    },
    onSuccess,
  });

  const { mutate: deleteMutate } = useMutation({
    mutationKey: ["task-delete"],
    mutationFn: async () => {
      const response = await axios.post<{ id: number }>(
        `${NEXT_PUBLIC_API_URL}/todo/delete`,
        { id: current.id },
        getAuthOptions()
      );
      return response.data;
    },
    onSuccess,
  });

  const { mutate: doneMutate } = useMutation({
    mutationKey: ["task-done"],
    mutationFn: async (is_done: boolean) => {
      const response = await axios.post<{ is_done: boolean; id: number }>(
        `${NEXT_PUBLIC_API_URL}/todo/done`,
        { id: current.id, is_done },
        getAuthOptions()
      );
      return response.data;
    },
    onSuccess,
  });

  const debouncedUpdateMutate = useMemo(
    () => debounce(updateMutate, 1000),
    [updateMutate]
  );

  return {
    deleteTask: () => {
      if (current.desc === "") {
        // Delete if the description is blank
        deleteMutate();
      } else {
        // Otherwise mark it as deleted in DB
        updateMutate({ ...current, is_deleted: true });
      }
    },
    changeDesc: (newDesc: string) => {
      debouncedUpdateMutate({ ...current, desc: newDesc });
    },
    changeDone: (newDone: boolean) => {
      doneMutate(newDone);
    },
  };
}

export type UpdateTodoPriorityRequest = {
  id: number,
  priority: number
}

export function useUpdatePriority() {
  const { mutate } = useMutation({
    mutationKey: ["task-priority-update"],
    mutationFn: async (request: Array<UpdateTodoPriorityRequest>) => {
      const response = await axios.post<Array<UpdateTodoPriorityRequest>>(
        `${NEXT_PUBLIC_API_URL}/todo/update-priority`,
        request,
        getAuthOptions()
      );
      return response.data;
    },
  });

  return mutate
}