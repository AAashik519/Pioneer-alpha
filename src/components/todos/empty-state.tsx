"use client";

import { FiSearch, FiSliders, FiPlus } from "react-icons/fi";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import TodoNav from "./todo-nav";

interface EmptyStateProps {
  onAddTask: () => void;
}

export function EmptyState({ onAddTask }: EmptyStateProps) {
  // Add state for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    today: false,
    next5Days: false,
    next10Days: false,
    next30Days: false,
  });

  return (
    <div className="space-y-6 p-6">
      <TodoNav
        onAddTask={onAddTask}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
      />
      <div className="border-2 border-blue-400 rounded-lg p-12 flex flex-col items-center justify-center min-h-[600px] bg-gray-50">
        <div className="w-64 h-48 mb-8">
          <svg
            className="w-full h-full"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Left clipboard */}
            <rect
              x="20"
              y="40"
              width="60"
              height="80"
              fill="none"
              stroke="#d1d5db"
              strokeWidth="2"
              rx="4"
            />
            <line
              x1="30"
              y1="50"
              x2="50"
              y2="50"
              stroke="#d1d5db"
              strokeWidth="1"
            />
            <line
              x1="30"
              y1="65"
              x2="70"
              y2="65"
              stroke="#d1d5db"
              strokeWidth="1"
            />
            <line
              x1="30"
              y1="80"
              x2="70"
              y2="80"
              stroke="#d1d5db"
              strokeWidth="1"
            />
            {/* Right clipboard */}
            <rect
              x="100"
              y="30"
              width="70"
              height="100"
              fill="none"
              stroke="#d1d5db"
              strokeWidth="2"
              rx="4"
            />
            <line
              x1="110"
              y1="45"
              x2="140"
              y2="45"
              stroke="#d1d5db"
              strokeWidth="1"
            />
            <line
              x1="110"
              y1="60"
              x2="160"
              y2="60"
              stroke="#d1d5db"
              strokeWidth="1"
            />
            <line
              x1="110"
              y1="75"
              x2="160"
              y2="75"
              stroke="#d1d5db"
              strokeWidth="1"
            />
            {/* Blue box in right clipboard */}
            <rect x="100" y="80" width="20" height="20" fill="#4f46e5" rx="2" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">No todos yet</h2>
      </div>
    </div>
  );
}
