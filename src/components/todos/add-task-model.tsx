"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm, Controller } from "react-hook-form";
import { FiCalendar, FiTrash2 } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { format } from "date-fns";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "extreme" | "moderate" | "low";
  todo_date: string;
}

interface TaskModalProps {
  mode: "add" | "edit";
  task?: Task;
  onClose: () => void;
  onSubmit: (taskData: {
    title: string;
    description: string;
    priority: "extreme" | "moderate" | "low";
    todo_date: string;
  }) => void;
}

type FormValues = {
  title: string;
  description: string;
  priority?: "extreme" | "moderate" | "low"; // optional
  todo_date: string;
};

export function TaskModal({ mode, task, onClose, onSubmit }: TaskModalProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      title: mode === "edit" && task ? task.title : "",
      description: mode === "edit" && task ? task.description : "",
     priority: mode === "edit" && task ? task.priority : undefined,
      todo_date: mode === "edit" && task ? task.todo_date : "",
    },
  });

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    mode === "edit" && task && task.todo_date ? new Date(task.todo_date) : undefined
  );
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const priorityColors = {
    extreme: "#EF4444",
    moderate: "#10B981",
    low: "#FBBF24",
  };

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const onFormSubmit = (data: FormValues) => {
  if (!data.priority) {
 
    return;
  }
  onSubmit(data as Required<FormValues>); // cast to required for onSubmit
  reset();
  setSelectedDate(undefined);
  onClose();
};

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setValue("todo_date", format(date, "yyyy-MM-dd"));
      setPopoverOpen(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!mounted) return null;

  const modalTitle = mode === "add" ? "Add New Task" : "Update Task";
  const submitButtonText = mode === "add" ? "Done" : "Update";

  const modalContent = (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg w-full max-w-2xl p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl md:ml-64">
        <div className="flex items-center justify-between border-b-2 border-blue-600 pb-4">
          <h2 className="text-2xl font-bold text-gray-900">{modalTitle}</h2>
          <button
            onClick={onClose}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Go Back
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">Title</label>
            <Input
              {...register("title", { required: true })}
              placeholder=""
              className="border-[1px] border-gray-300 focus:border-gray-500 focus:ring-0 h-12"
            />
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">Date</label>
            <Controller
              control={control}
              name="todo_date"
              render={({ field }) => (
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="w-full h-12 px-4 border border-gray-300 rounded-md bg-white text-left text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors flex items-center justify-between"
                      onClick={() => setPopoverOpen(true)}
                    >
                      <span>
                        {selectedDate
                          ? format(selectedDate, "MMM dd, yyyy")
                          : "Select a date"}
                      </span>
                      <FiCalendar className="w-5 h-5 text-gray-400" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-[999]" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        handleDateSelect(date);
                      }}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
          </div>

          {/* Priority */}
        <div className="space-y-3">
  <label className="text-sm font-semibold text-gray-900">Priority</label>
  <div className="flex flex-wrap gap-4 mt-3">
    {(["extreme", "moderate", "low"] as const).map((priority) => (
      <div
        key={priority}
        className="flex items-center justify-between gap-2 min-w-[120px]"
      >
        <p className="flex items-center gap-1 capitalize">
          <GoDotFill size={20} style={{ color: priorityColors[priority] }} />
          {priority}
        </p>
        <input
          type="checkbox"
          checked={watch("priority") === priority}
          onChange={() => setValue("priority", priority)}
          className="w-4 h-4 cursor-pointer"
        />
      </div>
    ))}
  </div>
</div>


          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">Task Description</label>
            <Textarea
              {...register("description")}
              placeholder="Start writing here....."
              className="border-gray-300 focus:border-blue-500 focus:ring-0 min-h-40 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between pt-4">
            <Button
              type="submit"
              className="bg-secondary hover:bg-secondaryHover duration-200 text-white font-medium px-8 h-10 rounded-lg"
            >
              {submitButtonText}
            </Button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
            >
              <FiTrash2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
