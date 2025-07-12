import { useEffect, useState } from "react";
import {
  DndContext,
  type DragEndEvent,
  closestCorners,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Column } from "./components/Column";
import type { Task, TaskStatus } from "./types/types";
import { v4 as uuidv4 } from "uuid";
import { TaskFormModal } from "./components/TaskFormModal";
import "./App.css";
import { isOverdue } from "./utils/helpers";

const COLUMNS: TaskStatus[] = ["New", "Ongoing", "Done"];
function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", [] as Task[]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  console.log(
    tasks,
    "isAuthenticatedisAuthenticatedisAuthenticatedisAuthenticated"
  );

  useEffect(() => {
    const overdueTasks = tasks.filter(
      (task) => task.status === "Ongoing" && isOverdue(task.dueDate)
    );

    if (overdueTasks.length > 0) {
      alert(`You have ${overdueTasks.length} overdue task(s)!`);
    }
  }, [tasks]);

  const handleMove = (id: string, newStatus: TaskStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          const startDate =
            newStatus === "Ongoing" && task.status === "New"
              ? new Date()
              : task.startDate;

          const completedAt = newStatus === "Done" ? new Date() : undefined;

          if (newStatus === "Ongoing" && isOverdue(task.dueDate)) {
            alert(`Task "${task.title}" is overdue!`);
          }

          return {
            ...task,
            status: newStatus,
            startDate,
            completedAt,
          };
        }
        return task;
      })
    );
  };

  const handleCreate = (newTask: Omit<Task, "id" | "createdAt" | "status">) => {
    setTasks((prevTasks) => [
      {
        id: uuidv4(),
        ...newTask,
        status: "New" as const,
        createdAt: new Date(),
      },
      ...prevTasks,
    ]);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id.toString();
    const sourceStatus = active.data.current?.task.status;
    const destinationStatus = over.data.current?.status;

    if (sourceStatus === destinationStatus) return;

    if (destinationStatus) {
      handleMove(taskId, destinationStatus);
    }
  };

  const handleEdit = (task: Task) => {
    console.log(
      task,
      "initialDatainitialDatainitialDatainitialDatainitialData"
    );

    setEditingTask(task);
  };

  const handleUpdate = (
    updatedTask: Omit<Task, "id" | "createdAt" | "status">
  ) => {
    if (!editingTask) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editingTask.id
          ? {
              ...task,
              ...updatedTask,
            }
          : task
      )
    );
    setEditingTask(null);
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );
  return (
    <div className="min-h-screen bg-white">
      <h1 className=" !text-[18px] md:!text-3xl text-[#222] font-bold text-center md:py-8 py-4">
        Kanban Board
      </h1>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <div className="container mx-auto border border-[#2222] h-screen rounded-[10px] overflow-auto scrollbar-hidden">
          <div className="p-4 text-[#333] md:flex hidden justify-between">
            <h3 className="text-[#333] text-[16px] font-bold"> Kanban View </h3>
            <div className="flex text-[#333]  ">
              <div className="avatar-list-stacked avatar-group-sm">
                <span className="avatar avatar-rounded">
                  <img
                    className="border border-white"
                    src="/images/avatar-1.jpg"
                    alt="img"
                  />
                </span>
                <span className="avatar avatar-rounded">
                  <img
                    className="border border-white"
                    src="/images/avatar-02.jpg"
                    alt="img"
                  />
                </span>
                <span className="avatar avatar-rounded">
                  <img
                    className="border border-white"
                    src="/images/avatar-03.jpg"
                    alt="img"
                  />
                </span>
                <span className="avatar !rounded-[60px] bg-[#e41f07] text-[12px]">
                  1+
                </span>
              </div>
              <p className="ml-[30px] pr-[10px]">
                <span className="font-bold"> Total Task </span> :{" "}
                {tasks?.length}
              </p>
              <p className="pr-[10px]">
                <span className="font-bold">Pending</span> :{" "}
                {tasks.filter((task) => task.status === "Ongoing").length}
              </p>
              <p>
                <span className="font-bold">Completed</span> :{" "}
                {tasks.filter((task) => task.status === "Done").length}
              </p>
            </div>
          </div>
          <div className="px-4 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {COLUMNS.map((status) => (
                <Column
                  key={status}
                  status={status}
                  tasks={tasks}
                  onMove={handleMove}
                  onCreate={handleCreate}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          </div>
        </div>
      </DndContext>
      {editingTask && (
        <TaskFormModal
          isOpen={!!editingTask}
          onClose={() => setEditingTask(null)}
          onSubmit={handleUpdate}
          initialData={editingTask}
        />
      )}
    </div>
  );
}

export default App;
