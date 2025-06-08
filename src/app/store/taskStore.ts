import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { Task, TaskStatus, TaskFilters } from "@/lib/types";
import { TaskFormValues } from "@/lib/validations";

interface TaskStore {
  tasks: Task[];
  filters: TaskFilters;
  isLoading: boolean;
  error: string | null;

  // Actions
  addTask: (taskData: TaskFormValues) => void;
  updateTask: (id: string, taskData: Partial<TaskFormValues>) => void;
  deleteTask: (id: string) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  setFilters: (filters: Partial<TaskFilters>) => void;
  clearFilters: () => void;
  getFilteredTasks: () => Task[];
  getTasksByStatus: (status: TaskStatus) => Task[];
}

const initialTasks: Task[] = [
  {
    id: uuidv4(),
    title: "Setup project structure",
    description: "Initialize Next.js project with all required dependencies",
    status: "Done",
    priority: "High",
    assignee: "John Doe",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Implement task CRUD operations",
    description: "Create, read, update, and delete functionality for tasks",
    status: "In Progress",
    priority: "High",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    assignee: "Jane Smith",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Add drag and drop functionality",
    description: "Implement drag and drop between task columns",
    status: "To Do",
    priority: "Medium",
    assignee: "Bob Johnson",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Create recipe page",
    description: "Implement bonus recipe feature with API integration",
    status: "To Do",
    priority: "Low",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: initialTasks,
  filters: {},
  isLoading: false,
  error: null,

  addTask: (taskData: TaskFormValues) => {
    const newTask: Task = {
      id: uuidv4(),
      ...taskData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      tasks: [...state.tasks, newTask],
      error: null,
    }));
  },

  updateTask: (id: string, taskData: Partial<TaskFormValues>) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, ...taskData, updatedAt: new Date().toISOString() }
          : task
      ),
      error: null,
    }));
  },

  deleteTask: (id: string) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
      error: null,
    }));
  },

  updateTaskStatus: (id: string, status: TaskStatus) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, status, updatedAt: new Date().toISOString() }
          : task
      ),
      error: null,
    }));
  },

  setFilters: (filters: Partial<TaskFilters>) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }));
  },

  clearFilters: () => {
    set({ filters: {} });
  },

  getFilteredTasks: () => {
    const { tasks, filters } = get();
    let filteredTasks = [...tasks];

    if (filters.status && filters.status.length > 0) {
      filteredTasks = filteredTasks.filter((task) =>
        filters.status!.includes(task.status)
      );
    }

    if (filters.priority && filters.priority.length > 0) {
      filteredTasks = filteredTasks.filter((task) =>
        filters.priority!.includes(task.priority)
      );
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchLower) ||
          task.description?.toLowerCase().includes(searchLower) ||
          task.assignee?.toLowerCase().includes(searchLower)
      );
    }

    return filteredTasks;
  },

  getTasksByStatus: (status: TaskStatus) => {
    const filteredTasks = get().getFilteredTasks();
    return filteredTasks.filter((task) => task.status === status);
  },
}));
