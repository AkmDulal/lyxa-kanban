import type { TaskStatus } from '../types/types';
import { getNextStatus } from '../utils/helpers';

interface ContextMenuProps {
  x: number;
  y: number;
  currentStatus: TaskStatus;
  onMove: (status: TaskStatus) => void;
  onClose: () => void;
}

export const ContextMenu = ({ x, y, currentStatus, onMove, onClose }: ContextMenuProps) => {
  const nextStatusOptions = getNextStatus(currentStatus);

  const handleMove = (status: TaskStatus) => {
    onMove(status);
    onClose();
  };

  return (
    <div
      className="fixed bg-white shadow-lg rounded-md py-1 z-50 border border-[#2222]"
      style={{ 
        top: y, 
        left: x,
        minWidth: '150px'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-4 py-2 font-semibold border-b border-[#2222] text-[#333]">Move to</div>
      {nextStatusOptions.map((status) => (
        <button
          key={status}
          className="block w-full text-left px-4 py-2 hover:bg-[#f7f8f9] text-[#333] text-sm"
          onClick={() => handleMove(status)}
        >
          {status}
        </button>
      ))}
    </div>
  );
};