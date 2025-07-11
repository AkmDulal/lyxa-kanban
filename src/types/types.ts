export type TaskStatus = 'New' | 'Ongoing' | 'Done';
export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface Employee {
  id: string;
  name: string;
  avatar: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  employees?: Employee[];
  startDate: Date;
  dueDate: Date;
  createdAt: Date;
  completedAt?: Date;
}

export interface Column {
  id: TaskStatus;
  title: string;
  color: string;
}