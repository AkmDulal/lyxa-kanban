import { useDroppable } from '@dnd-kit/core';
import type { Task, TaskStatus } from '../types/types';
import { statusColors } from '../utils/helpers';
import { TaskCard } from './TaskCard';
import { TaskFormModal } from './TaskFormModal';
import { useState } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";

interface ColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onMove: (id: string, newStatus: TaskStatus) => void;
  onCreate: (task: Omit<Task, 'id' | 'createdAt' | 'status'>) => void;
  onEdit: (task: Task) => void;
}

export const Column = ({ status, tasks, onMove, onCreate, onEdit }: ColumnProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: {
      accepts: ['task'],
      status
    }
  });

  const columnClasses = `flex-1 bg-gray-100 p-4 bg-[#f7f8f9] rounded-lg flex flex-col ${
    isOver ? 'ring-2 ring-blue-500 bg-blue-50' : ''
  }`;

  const handleCreate = () => {
    if (status === 'New') {
      setIsModalOpen(true);
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={columnClasses}
    >
      <div className={`bg-white p-4 rounded-[10px] text-[#333] mb-[10px] font-bold flex items-center relative border border-[#2222]`}>
        <span className='w-[20px] h-[20px] flex rounded-full absolute left-[11px] opacity-30' style={{background: statusColors[status] }}>  </span>
        <span className='w-[10px] h-[10px] flex rounded-full' style={{background: statusColors[status] }}>  </span>
        <span className='ml-[15px] flex'> {status} </span>
        <BsThreeDotsVertical className="ml-auto" />
      </div>
      <div className="rounded-b-lg flex-1 min-h-[200px]">
        <div className="space-y-3">
          {tasks
            .filter((task) => task.status === status)
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onMove={onMove}
                onEdit={onEdit}
              />
            ))}
        </div>

        {status === 'New' && (
          <button
            onClick={handleCreate}
            className="w-full py-2 mt-4 !font-bold !bg-[#ffa201] hover:!bg-[#e41f07] text-white rounded !border-0"
          >
            + Add Task
          </button>
        )}
      </div>
      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onSubmit={(newTask) => {
          onCreate(newTask);
          setIsModalOpen(false);
        }}
        // initialData={undefined}
      />
    </div>
  );
};