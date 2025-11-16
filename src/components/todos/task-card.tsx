"use client";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Button } from "../ui/button";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "extreme" | "moderate" | "low";
  todo_date: string;
}

interface TaskCardProps {
  task: Task;
  onDelete: () => void;
  onUpdate: (task: Task) => void;
}

const priorityStyles: any = {
  extreme: "bg-red-100 text-red-700",
  moderate: "bg-green-100 text-green-700",
  low: "bg-yellow-100 text-yellow-700",
};

export function TaskCard({ task, onDelete, onUpdate }: TaskCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 space-y-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="flex-1 space-y-4">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {task.title}
          </h3>
          <span
            className={`shrink-0 px-3 py-1 rounded text-xs font-medium capitalize ${
              priorityStyles[task.priority]
            }`}
          >
            {task.priority}
          </span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-3">
          {task.description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-sm text-gray-500">
          Due {formatDate(task.todo_date)}
        </span>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onUpdate(task)}
            className="hover:bg-blue-50 p-2"
            title="Edit task"
          >
            <FiEdit2 className="w-4 h-4 text-blue-500" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="hover:bg-red-50 p-2"
            title="Delete task"
          >
            <FiTrash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      </div>
    </div>
  );
}
