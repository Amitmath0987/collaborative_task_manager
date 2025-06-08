"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task, TaskStatus } from "@/lib/types";
import { TaskCard } from "./TaskCard";
import { TaskForm } from "./TaskForm";
import { TaskFilters } from "./TaskFilters";
import { TaskFormValues } from "@/lib/validations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SortableTaskCard } from "./SortableTaskCard";
import { useTaskStore } from "@/app/store/taskStore";

const COLUMNS: { id: TaskStatus; title: string; color: string }[] = [
  { id: "To Do", title: "To Do", color: "bg-gray-50 border-gray-200" },
  {
    id: "In Progress",
    title: "In Progress",
    color: "bg-blue-50 border-blue-200",
  },
  { id: "Done", title: "Done", color: "bg-green-50 border-green-200" },
];

export function TaskBoard() {
  const { addTask, updateTaskStatus, getTasksByStatus } = useTaskStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleCreateTask = (data: TaskFormValues) => {
    addTask(data);
    setIsCreateModalOpen(false);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = COLUMNS.flatMap((column) => getTasksByStatus(column.id)).find(
      (task) => task.id === active.id
    );
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Check if we're dropping over a column
    const overColumn = COLUMNS.find((column) => column.id === overId);
    if (overColumn) {
      updateTaskStatus(activeId, overColumn.id);
      return;
    }

    // Check if we're dropping over another task
    const overTask = COLUMNS.flatMap((column) =>
      getTasksByStatus(column.id)
    ).find((task) => task.id === overId);

    if (overTask && activeId !== overId) {
      updateTaskStatus(activeId, overTask.status);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Filters and Actions */}
      <div className="mb-6">
        <TaskFilters onCreateTask={() => setIsCreateModalOpen(true)} />
      </div>

      {/* Task Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {COLUMNS.map((column) => (
            <TaskColumn
              key={column.id}
              column={column}
              tasks={getTasksByStatus(column.id)}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="rotate-3 opacity-80">
              <TaskCard task={activeTask} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Create Task Modal */}
      <TaskForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTask}
      />
    </div>
  );
}

interface TaskColumnProps {
  column: { id: TaskStatus; title: string; color: string };
  tasks: Task[];
}

function TaskColumn({ column, tasks }: TaskColumnProps) {
  return (
    <Card className={`h-fit min-h-[500px] ${column.color}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            {column.title}
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            {tasks.length}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <div
            className="space-y-3 min-h-[400px] rounded-lg border-2 border-dashed border-gray-200 p-3 transition-colors"
            data-column={column.id}
          >
            {tasks.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
                No tasks in {column.title.toLowerCase()}
              </div>
            ) : (
              tasks.map((task) => (
                <SortableTaskCard key={task.id} task={task} />
              ))
            )}
          </div>
        </SortableContext>
      </CardContent>
    </Card>
  );
}
