"use client";

import { useState } from "react";
import { TaskStatus, TaskPriority } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Filter, X, Plus, SortAsc, SortDesc } from "lucide-react";
import { useTaskStore } from "@/app/store/taskStore";
import { Badge } from "../ui/badge";

interface TaskFiltersProps {
  onCreateTask: () => void;
}

type SortOption = "dueDate" | "priority" | "createdAt" | "title";
type SortDirection = "asc" | "desc";

export function TaskFilters({ onCreateTask }: TaskFiltersProps) {
  const { filters, setFilters, clearFilters, tasks } = useTaskStore();
  const [searchInput, setSearchInput] = useState(filters.search || "");
  const [sortBy, setSortBy] = useState<SortOption>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const statusOptions: TaskStatus[] = ["To Do", "In Progress", "Done"];
  const priorityOptions: TaskPriority[] = ["Low", "Medium", "High"];

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setFilters({ search: value || undefined });
  };

  const handleStatusToggle = (status: TaskStatus) => {
    const currentStatuses = filters.status || [];
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter((s) => s !== status)
      : [...currentStatuses, status];

    setFilters({
      status: newStatuses.length > 0 ? newStatuses : undefined,
    });
  };

  const handlePriorityToggle = (priority: TaskPriority) => {
    const currentPriorities = filters.priority || [];
    const newPriorities = currentPriorities.includes(priority)
      ? currentPriorities.filter((p) => p !== priority)
      : [...currentPriorities, priority];

    setFilters({
      priority: newPriorities.length > 0 ? newPriorities : undefined,
    });
  };

  const handleClearFilters = () => {
    setSearchInput("");
    clearFilters();
  };

  const handleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(option);
      setSortDirection("asc");
    }
  };

  const activeFilterCount =
    (filters.status?.length || 0) +
    (filters.priority?.length || 0) +
    (filters.search ? 1 : 0);

  const priorityColors = {
    Low: "bg-green-100 text-green-800 border-green-200",
    Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    High: "bg-red-100 text-red-800 border-red-200",
  };

  const statusColors = {
    "To Do": "bg-gray-100 text-gray-800 border-gray-200",
    "In Progress": "bg-blue-100 text-blue-800 border-blue-200",
    Done: "bg-green-100 text-green-800 border-green-200",
  };

  return (
    <div className="space-y-4">
      {/* Top Row: Search and Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search tasks..."
            value={searchInput}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          {/* Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="relative">
                <Filter className="mr-2 h-4 w-4" />
                Filter
                {activeFilterCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="ml-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                  >
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              {statusOptions.map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={filters.status?.includes(status) || false}
                  onCheckedChange={() => handleStatusToggle(status)}
                >
                  {status}
                </DropdownMenuCheckboxItem>
              ))}

              <DropdownMenuSeparator />
              <DropdownMenuLabel>Priority</DropdownMenuLabel>
              {priorityOptions.map((priority) => (
                <DropdownMenuCheckboxItem
                  key={priority}
                  checked={filters.priority?.includes(priority) || false}
                  onCheckedChange={() => handlePriorityToggle(priority)}
                >
                  {priority}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {sortDirection === "asc" ? (
                  <SortAsc className="mr-2 h-4 w-4" />
                ) : (
                  <SortDesc className="mr-2 h-4 w-4" />
                )}
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={sortBy === "title"}
                onCheckedChange={() => handleSort("title")}
              >
                Title
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sortBy === "priority"}
                onCheckedChange={() => handleSort("priority")}
              >
                Priority
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sortBy === "dueDate"}
                onCheckedChange={() => handleSort("dueDate")}
              >
                Due Date
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sortBy === "createdAt"}
                onCheckedChange={() => handleSort("createdAt")}
              >
                Created Date
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button onClick={onCreateTask}>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-600">Active filters:</span>

          {filters.status?.map((status) => (
            <Badge
              key={status}
              variant="outline"
              className={`${statusColors[status]} cursor-pointer`}
              onClick={() => handleStatusToggle(status)}
            >
              {status}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}

          {filters.priority?.map((priority) => (
            <Badge
              key={priority}
              variant="outline"
              className={`${priorityColors[priority]} cursor-pointer`}
              onClick={() => handlePriorityToggle(priority)}
            >
              {priority}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}

          {filters.search && (
            <Badge
              variant="outline"
              className="cursor-pointer"
              onClick={() => handleSearchChange("")}
            >
              Search: &quot;{filters.search}&quot;
              <X className="ml-1 h-3 w-3" />
            </Badge>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="h-8 px-2 text-xs"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {tasks.filter(() => true).length} tasks
      </div>
    </div>
  );
}
