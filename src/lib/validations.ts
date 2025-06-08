import { z } from "zod";

export const TaskStatusEnum = z.enum(["To Do", "In Progress", "Done"]);
export const TaskPriorityEnum = z.enum(["Low", "Medium", "High"]);

export const TaskSchema = z.object({
  id: z.string().uuid(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z.string().optional(),
  status: TaskStatusEnum,
  priority: TaskPriorityEnum,
  dueDate: z
    .string()
    .optional()
    .refine((date) => {
      if (!date) return true;
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, "Invalid date format"),
  assignee: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const TaskFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z.string().optional(),
  status: TaskStatusEnum,
  priority: TaskPriorityEnum,
  dueDate: z
    .string()
    .optional()
    .refine((date) => {
      if (!date) return true;
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime()) && parsedDate >= new Date();
    }, "Due date must be in the future"),
  assignee: z.string().optional(),
});

export const TaskFiltersSchema = z.object({
  status: z.array(TaskStatusEnum).optional(),
  priority: z.array(TaskPriorityEnum).optional(),
  search: z.string().optional(),
});

export type TaskFormValues = z.infer<typeof TaskFormSchema>;
export type TaskFiltersValues = z.infer<typeof TaskFiltersSchema>;
