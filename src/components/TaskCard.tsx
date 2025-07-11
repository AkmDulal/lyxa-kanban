import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import type { Task, TaskStatus } from "../types/types";
import { formatDate, isOverdue, getNextStatus } from "../utils/helpers";
import { GoDotFill } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuKanban } from "react-icons/lu";

interface TaskCardProps {
  task: Task;
  onMove: (id: string, newStatus: TaskStatus) => void;
  onEdit: (task: Task) => void;
}

export const TaskCard = ({ task, onMove, onEdit }: TaskCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const priorityColors = {
    Low: 'bg-green-500',
    Medium: 'bg-yellow-500',
    High: 'bg-orange-500',
    Urgent: 'bg-red-500',
  };

  if (!task.employees) return null;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={() => onEdit(task)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="task-card relative"
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
      }}
    >
      <div className="p-4 border border-[#2222] rounded-[10px] bg-white">
        <div className="flex justify-between text-[#222]">
          <div className={`px-[6px] py-[3px] rounded-[6px] text-white font-bold flex items-center text-[12px] ${priorityColors[task.priority]}`}>
            <GoDotFill className="text-white mr-[3px] mt-[2px]" /> {task.priority}
          </div>
          <BsThreeDotsVertical className="ml-auto" />
        </div>
        
        <div className="font-semibold text-lg text-[#333] py-[15px] flex">
          <div className="bg-[#ffa201] w-[25px] h-[25px] rounded-full flex justify-center items-center mr-[10px] mt-[3px]">
            <LuKanban className="text-[14px]" />
          </div>
          <div className="">
              {task.title.length > 30 ? `${task.title.substring(0, 30)}...` : task.title}
            <p className="text-gray-600 text-sm mt-1">{task.description.length > 80 ? `${task.description.substring(0, 80)}...` : task.description} </p>
            <div className="mt-2 text-xs text-gray-500">
              <div>Start: {formatDate(task.startDate)}</div>
              <div className={`${isOverdue(task.dueDate) ? "text-red-500 font-bold" : ""}`}>
                Due: {formatDate(task.dueDate)}
                {isOverdue(task.dueDate) && " (Overdue)"}
              </div>
              {task.completedAt && (
                <div>Completed: {formatDate(task.completedAt)}</div>
              )}
            </div>
          </div>
        </div>


       

        <div className="pt-[10px] border-t border-[#2222] flex justify-between items-center">
          <div className="avatar-list-stacked avatar-group-sm">
            {task.employees.slice(0, 3).map(employee => (
              <span key={employee.id} className="avatar avatar-rounded">
                <img
                  className="border border-white"
                  src={employee.avatar}
                  alt={employee.name}
                />
              </span>
            ))}
            {task.employees.length > 3 && (
              <span className="avatar !rounded-[60px] bg-[#e41f07] text-[12px]">
                +{task.employees.length - 3}
              </span>
            )}
          </div>

          <div className="text-[#222] flex">
             {isHovered && (
          <div className="flex space-x-2 mt-2 items-center">
            <span className="text-[12px] font-bold "> Move to : </span>
           {getNextStatus(task.status).map((status) => (
              <button
                key={status}
                onClick={(e) => {
                  e.stopPropagation();
                  onMove(task.id, status);
                }}
                className={` !px-[8px] !py-[3px] !text-[11px] rounded !font-bold ${
                  `${status}` === 'Ongoing' ? '!bg-[#FFA500] text-white' :
                  `${status}` === 'Done' ? '!bg-[#00c950] text-white' :
                  `${status}` === 'New' ? '!bg-[#0000FF] text-white' :
                  '!bg-[0000FF] text-white'
                }`}
              >
                 {status}
              </button>
            ))}
          </div>
         )} 
          </div>
        </div>
      </div>
    </div>
  );
};