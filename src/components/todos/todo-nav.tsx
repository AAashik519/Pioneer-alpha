"use client";
import { FiPlus, FiSearch, FiSliders } from "react-icons/fi";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

interface TodoNavProps {
  onAddTask: () => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  filters: {
    today: boolean;
    next5Days: boolean;
    next10Days: boolean;
    next30Days: boolean;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      today: boolean;
      next5Days: boolean;
      next10Days: boolean;
      next30Days: boolean;
    }>
  >;
}

const TodoNav: React.FC<TodoNavProps> = ({
  onAddTask,
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
}) => {
  const [showFilter, setShowFilter] = useState(false);

  const handleCheckboxChange = (name: keyof typeof filters) => {
    setFilters((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const hasActiveFilters = Object.values(filters ?? {}).some(Boolean);


  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Todos</h1>
          <p className="text-sm text-gray-500 mt-1">
            Drag and drop to reorder your tasks
          </p>
        </div>
        <Button
          onClick={onAddTask}
          className="flex items-center gap-2 bg-secondary hover:bg-secondaryHover duration-300 text-white"
        >
          <FiPlus className="w-4 h-4" />
          New Task
        </Button>
      </div>

      <div className="flex gap-4 relative">
        {/* Search Input */}
        <div className="flex-1 relative">
         <div className="absolute right-1 top-1/2 -translate-y-1/2 text-white bg-secondary hover:bg-secondaryHover duration-300 w-10 h-ful  flex items-center justify-center rounded-lg" > <FiSearch  className="w-6 h-10 " /></div>
          <Input
            placeholder="Search your task here..."
            className="pl-5 bg-white border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-12 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Button */}
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilter(!showFilter)}
            className={`${
              hasActiveFilters
                ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white border-0"
                : "bg-white border border-gray-300 hover:bg-gray-50"
            } h-12 w-12 rounded-lg transition-colors`}
            title="Filter tasks"
          >
            <FiSliders className="w-4 h-4" />
          </Button>

          {showFilter && (
            <div className="absolute right-0 top-14 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-20 w-56 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Filter by Date
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500 cursor-pointer"
                        checked={filters.today}
                        onChange={() => handleCheckboxChange("today")}
                      />
                      <span className="text-sm text-gray-700">Deadline Today</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500 cursor-pointer"
                        checked={filters.next5Days}
                        onChange={() => handleCheckboxChange("next5Days")}
                      />
                      <span className="text-sm text-gray-700">
                        Due in Next 5 Days
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500 cursor-pointer"
                        checked={filters.next10Days}
                        onChange={() => handleCheckboxChange("next10Days")}
                      />
                      <span className="text-sm text-gray-700">
                        Due in Next 10 Days
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500 cursor-pointer"
                        checked={filters.next30Days}
                        onChange={() => handleCheckboxChange("next30Days")}
                      />
                      <span className="text-sm text-gray-700">
                        Due in Next 30 Days
                      </span>
                    </label>
                  </div>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={() =>
                      setFilters({
                        today: false,
                        next5Days: false,
                        next10Days: false,
                        next30Days: false,
                      })
                    }
                    className="w-full text-center text-sm text-blue-500 hover:text-blue-700 font-medium py-2 border-t border-gray-200 mt-2"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoNav;