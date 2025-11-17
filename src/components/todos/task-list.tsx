"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "../ui/button";
import TodoNav from "./todo-nav";
import { TaskCard } from "./task-card";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "extreme" | "moderate" | "low";
  todo_date: string;
}

interface TasksListProps {
  tasks: Task[];
  onAddTask: () => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (task: Task) => void;
}

export function TasksList({
  tasks,
  onAddTask,
  onDeleteTask,
  onUpdateTask,
}: TasksListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    today: false,
    next5Days: false,
    next10Days: false,
    next30Days: false,
  });

  const [orderedTasks, setOrderedTasks] = useState<Task[]>(tasks);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  // New states for global delete popup
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  useEffect(() => {
    setOrderedTasks(tasks);
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    let filtered = orderedTasks;

    if (searchTerm) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    filtered = filtered.filter((task) => {
      const taskDate = new Date(task.todo_date);
      taskDate.setHours(0, 0, 0, 0);

      const diffDays = Math.ceil(
        (taskDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (filters.today && diffDays === 0) return true;
      if (filters.next5Days && diffDays > 0 && diffDays <= 5) return true;
      if (filters.next10Days && diffDays > 0 && diffDays <= 10) return true;
      if (filters.next30Days && diffDays > 0 && diffDays <= 30) return true;

      return !Object.values(filters).some(Boolean);
    });

    return filtered;
  }, [orderedTasks, searchTerm, filters]);

  // Drag-and-drop handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.currentTarget.innerHTML);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetTask: Task) => {
    e.preventDefault();

    if (!draggedTask || draggedTask.id === targetTask.id) return;

    const draggedIndex = orderedTasks.findIndex(
      (t) => t.id === draggedTask.id
    );
    const targetIndex = orderedTasks.findIndex((t) => t.id === targetTask.id);

    const newTasks = [...orderedTasks];
    newTasks.splice(draggedIndex, 1);
    newTasks.splice(targetIndex, 0, draggedTask);

    setOrderedTasks(newTasks);
    setDraggedTask(null);
  };

  return (
    <div className="space-y-6 p-6">
      <TodoNav
        onAddTask={onAddTask}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
      />

      <h2 className="text-lg font-bold text-gray-900 mb-4">Your Tasks</h2>

      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => handleDragStart(e, task)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, task)}
              className={`cursor-move transition-all duration-200 ${
                draggedTask?.id === task.id
                  ? "opacity-50 scale-95 ring-2 ring-blue-400"
                  : "opacity-100 hover:scale-105"
              }`}
            >
              <TaskCard
                task={task}
                onDelete={() => {
                  setTaskToDelete(task);
                  setShowDeleteConfirm(true);
                }}
                onUpdate={onUpdateTask}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No tasks found</p>
        </div>
      )}

    
      {showDeleteConfirm && taskToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm shadow-xl">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Task?
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <strong>"{taskToDelete.title}"</strong>? This action cannot be
              undone.
            </p>

            <div className="flex justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setShowDeleteConfirm(false)}
                className="hover:bg-gray-100"
              >
                Cancel
              </Button>

              <Button
                onClick={() => {
                  onDeleteTask(taskToDelete.id);
                  setShowDeleteConfirm(false);
                }}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
