import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Task, TaskStatus } from '../../../types/types';
import { v4 as uuidv4 } from 'uuid';

interface TaskState {
  tasks: Task[];
  editingTask: Task | null;
}

const initialState: TaskState = {
  tasks: [],
  editingTask: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'createdAt' | 'status'>>) => {
      const newTask: Task = {
        id: uuidv4(),
        ...action.payload,
        status: 'New',
        createdAt: new Date(),
      };
      state.tasks.unshift(newTask);
    },
    moveTask: (state, action: PayloadAction<{ id: string; newStatus: TaskStatus }>) => {
      const { id, newStatus } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex].status = newStatus;
        if (newStatus === 'Done') {
          state.tasks[taskIndex].completedAt = new Date();
        }
      }
    },
    setEditingTask: (state, action: PayloadAction<Task | null>) => {
      state.editingTask = action.payload;
    },
    updateTask: (state, action: PayloadAction<Omit<Task, 'id' | 'createdAt' | 'status'>>) => {
      if (state.editingTask) {
        const taskIndex = state.tasks.findIndex((task) => task.id === state.editingTask?.id);
        if (taskIndex !== -1) {
          state.tasks[taskIndex] = {
            ...state.tasks[taskIndex],
            ...action.payload,
          };
        }
        state.editingTask = null;
      }
    },
  },
});

export const { addTask, moveTask, setEditingTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;