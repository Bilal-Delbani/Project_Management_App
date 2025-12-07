import { useState, useRef, useContext } from "react";
import ErrorDialog from "./ErrorDialog.jsx";
import { ProjectManagementContext } from "../contexts/project-management-context.jsx";

export default function Tasks({ selectedProjectId }) {
  const { saveTasks, handleDeleteTask, tasksCollection } = useContext(
    ProjectManagementContext
  );

  const [enteredTask, setEnteredTask] = useState("");
  const dialogRef = useRef();

  function handleChange(event) {
    setEnteredTask(event.target.value);
  }
  function handleClick() {
    if (enteredTask.trim() === "") {
      dialogRef.current.open();
    } else {
      saveTasks(enteredTask);
      setEnteredTask("");
    }
  }

  const filteredArray = tasksCollection.filter(
    (task) => task.projectId === selectedProjectId
  );

  return (
    <>
      <ErrorDialog ref={dialogRef} />
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <div className="flex items-center gap-4">
        <input
          value={enteredTask}
          onChange={handleChange}
          type="text"
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        />
        <button
          onClick={handleClick}
          className="text-stone-700 hover:text-stone-950"
        >
          Add Task
        </button>
      </div>

      {filteredArray.length === 0 ? (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet.
        </p>
      ) : (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {filteredArray.map((task) => (
            <li key={task.id} className="flex justify-between my-4">
              <span>{task.name}</span>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-stone-700 hover:text-red-500"
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
