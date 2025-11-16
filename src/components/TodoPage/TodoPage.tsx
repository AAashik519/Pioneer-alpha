"use client";

import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "@/src/app/redux/features/todos/todosAPI";
import React, { useState } from "react";

import { toast } from "sonner";
import { EmptyState } from "../todos/empty-state";
import { TasksList } from "../todos/task-list";
import { TaskModal } from "../todos/add-task-model";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "extreme" | "moderate" | "low";
  todo_date: string;
}

const TodoPage = () => {
  const [createTodo] = useCreateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const {
    data: allTodo,
    isLoading: allTOdoLoading,
    refetch: allTodoRefetch,
  } = useGetTodosQuery("1");

  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleAddTask = async (taskData: Omit<Task, "id">) => {
    const toastId = toast.loading("Creating task...");

    try {
      const res = await createTodo(taskData).unwrap();
      if (res?.id) {
        toast.success("Task Created Successfully", {
          id: toastId,
          duration: 3000,
        });
        allTodoRefetch();
        setModalMode(null);
      }
    } catch (error: any) {
      if (error?.data?.detail) {
        toast.error(error.data.detail, { id: toastId, duration: 3000 });
      } else {
        toast.error("An unexpected error occurred.", {
          id: toastId,
          duration: 3000,
        });
      }
    }
  };

  const handleDeleteTask = async (id: string) => {
    const toastId = toast.loading("Deleting task...");
    try {
      await deleteTodo(id).unwrap();
      toast.success("Task deleted successfully", {
        id: toastId,
        duration: 3000,
      });
      allTodoRefetch();
    } catch (error: any) {
      if (error?.data?.detail) {
        toast.error(error.data.detail, { id: toastId, duration: 3000 });
      } else {
        toast.error("An unexpected error occurred.", {
          id: toastId,
          duration: 3000,
        });
      }
    }
  };

  const handleUpdateTask = async (taskData: {
    title: string;
    
    description: string;
    priority: "extreme" | "moderate" | "low";
    todo_date: string;
  }) => {
    console.log(taskData);
    console.log(typeof taskData.priority);
    
    const toastId = toast.loading("Updating task...");
    try {
      if (!selectedTask?.id) return;
      const res = await updateTodo({
        id: selectedTask.id,
        data: taskData,
      }).unwrap();

      if (res?.id) {
        toast.success("Task Updated Successfully", {
          id: toastId,
          duration: 3000,
        });
        // allTodoRefetch();
        // setModalMode(null);
        // setSelectedTask(null);
      }
    } catch (error: any) {
      console.log("Update Task Error:", error);

      const message =
        error?.data?.detail ||
        error?.data?.message ||
        error?.message ||
        error?.error;

      if (message) {
        toast.error(message, { id: toastId, duration: 3000 });
      }
    }
  };

  const handleOpenAddModal = () => {
    setModalMode("add");
    setSelectedTask(null);
  };

  const handleOpenEditModal = (task: Task) => {
    setSelectedTask(task);
    setModalMode("edit");
  };

  const handleCloseModal = () => {
    setModalMode(null);
    setSelectedTask(null);
  };

  if (allTOdoLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-3"></div>
          <p className="text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex-1 space-y-6">
        {allTodo?.results?.length === 0 ? (
          <EmptyState onAddTask={handleOpenAddModal} />
        ) : (
          <TasksList
            tasks={allTodo?.results || []}
            onAddTask={handleOpenAddModal}
            onDeleteTask={handleDeleteTask}
            onUpdateTask={handleOpenEditModal}
          />
        )}
      </div>

      {modalMode && (
        <TaskModal
          mode={modalMode}
          task={modalMode === "edit" ? selectedTask || undefined : undefined}
          onClose={handleCloseModal}
          onSubmit={modalMode === "add" ? handleAddTask : handleUpdateTask}
        />
      )}
    </div>
  );
};

export default TodoPage;
