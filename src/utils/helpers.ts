import type { TaskStatus } from '../types/types';

export const statusColors: Record<TaskStatus, string> = {
  New: '#0000FF',
  Ongoing: '#FFA500',
  Done: '#00c950',
};

export const getNextStatus = (currentStatus: TaskStatus): TaskStatus[] => {
  switch (currentStatus) {
    case 'New':
      return ['Ongoing', 'Done'];
    case 'Ongoing':
      return ['New', 'Done'];
    case 'Done':
      return ['New', 'Ongoing'];
    default:
      return [];
      // return ['New', 'Ongoing', 'Done'];
  }
};

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleString();
};

export const isOverdue = (dueDate?: Date): boolean => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
};