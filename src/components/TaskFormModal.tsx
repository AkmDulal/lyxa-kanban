import { useState } from "react";
import type { Task, Priority, Employee } from "../types/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Sample employee data
const employees: Employee[] = [
  {
    id: "1",
    name: "John Doe",
    avatar:
      "/images/avatar-1.jpg",
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar:
      "/images/avatar-02.jpg",
  },
  {
    id: "3",
    name: "Bob Johnson",
    avatar:
      "/images/avatar-03.jpg",
  },
];

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, "id" | "createdAt" | "status">) => void;
  initialData?: Omit<Task, "id" | "createdAt" | "status">;
}

export const TaskFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: TaskFormModalProps) => {
  console.log(initialData, "initialDatainitialDatainitialDatainitialDatainitialData");
  
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [priority, setPriority] = useState<Priority>(
    initialData?.priority || "Medium"
  );
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>(
    initialData?.employees || []
  );
  const [startDate, setStartDate] = useState<Date | null>(
    initialData?.startDate ? new Date(initialData.startDate) : null
  );
  const [dueDate, setDueDate] = useState<Date | null>(
    initialData?.dueDate ? new Date(initialData.dueDate) : null
  );

  const handleEmployeeSelect = (employee: Employee) => {
    setSelectedEmployees((prev) => {
      const exists = prev.some((e) => e.id === employee.id);
      return exists
        ? prev.filter((e) => e.id !== employee.id)
        : [...prev, employee];
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      priority,
      employees: selectedEmployees,
      startDate: startDate || new Date(),
      dueDate: dueDate || new Date(),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-[90%] md:max-w-[50%] max-h-[90vh] overflow-y-auto ">
        <h2 className="text-xl text-[#333] font-bold mb-4">
          {initialData ? "Edit Task" : "Create New Task"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#333] text-sm font-bold mb-3">
              Title <span className="text-[#f00]"> * </span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full py-3 px-3 text-[#333] border border-[#2222] rounded shadow-md/10 focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#333] text-sm font-bold mb-3">
              Priority <span className="text-[#f00]"> * </span>
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="w-full py-3 px-3 text-[#333] border border-[#2222] rounded shadow-md/10 focus:outline-none"
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-[#333] text-sm font-bold mb-3">
              Select Employee(s) <span className="text-[#f00]"> * </span>
            </label>
            <div className="border border-[#2222] rounded p-2 max-h-[120px] overflow-y-auto">
              {employees.map((employee) => (
                <div key={employee.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`emp-${employee.id}`}
                    checked={selectedEmployees.some(
                      (e) => e.id === employee.id
                    )}
                    onChange={() => handleEmployeeSelect(employee)}
                    className="mr-2 text-[#333]"
                  />
                  <label
                    htmlFor={`emp-${employee.id}`}
                    className="flex items-center text-[#222]"
                  >
                    <img
                      src={employee.avatar}
                      alt={employee.name}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    {employee.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-[#333] text-sm font-bold mb-3">
                Start Date <span className="text-[#f00]"> * </span>
              </label>

              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                timeFormat="HH:mm:ss"
                timeIntervals={1}
                dateFormat="yyyy-MM-dd HH:mm:ss"
                minDate={new Date()}
                className="w-full py-3 px-3 text-[#333] border border-[#2222] rounded shadow-md/10 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#333] text-sm font-bold mb-3">
                Due Date <span className="text-[#f00]"> * </span>
              </label>

              <DatePicker
                selected={dueDate}
                onChange={(date) => setDueDate(date)}
                showTimeSelect
                timeFormat="HH:mm:ss"
                timeIntervals={1}
                dateFormat="yyyy-MM-dd HH:mm:ss"
                minDate={startDate || new Date()}
                className="!w-full py-3 px-3 text-[#333] border border-[#2222] rounded shadow-md/10 focus:outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-[#333] text-sm font-bold mb-3">
              Description <span className="text-[#f00]"> * </span>
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full py-3 px-3 text-[#333] border border-[#2222] rounded shadow-md/10 focus:outline-none"
              rows={3}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 !bg-[#f00] !font-bold rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 !bg-[#0000ff] !font-bold text-white rounded"
              disabled={selectedEmployees.length === 0}
            >
              {initialData ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
