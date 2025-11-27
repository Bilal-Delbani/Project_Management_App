import { useRef } from "react";

import Input from "./Input.jsx";
import ErrorDialog from "./ErrorDialog.jsx";

export default function NewProject({ id, onCancel, onSave }) {
  const dialogRef = useRef();

  const titleRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef();

  function handleSave() {
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const date = dateRef.current.value;

    if (title.trim() === "" || description.trim() === "" || date.trim() === "") {
      dialogRef.current.open();
    } else {
      const project = {
        id: id,
        title: title,
        description: description,
        date: date,
      };
      onSave((prevProjects) => [...prevProjects, project]);

      titleRef.current.value = "";
      descriptionRef.current.value = "";
      dateRef.current.value = "";
      
      onCancel();
    }
  }
  return (
    <div className="w-[35rem] mt-16">
      <ErrorDialog ref={dialogRef} />
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button
            onClick={onCancel}
            className="text-stone-800 hover:text-stone-950"
          >
            Cancel
          </button>
        </li>
        <li>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
          >
            Save
          </button>
        </li>
      </menu>
      <div>
        <Input ref={titleRef} label="Title" InputWrapper="input" type="text" />
        <Input
          ref={descriptionRef}
          label="Description"
          InputWrapper="textarea"
        />
        <Input
          ref={dateRef}
          label="Due Date"
          InputWrapper="input"
          type="date"
        />
      </div>
    </div>
  );
}
