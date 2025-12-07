import Button from "./Button.jsx";
import { useContext } from "react";
import { ProjectManagementContext } from "../contexts/project-management-context.jsx";

export default function SideBar() {
  const { newProject, isNewProject, handleProjectSelected } = useContext(
    ProjectManagementContext
  );
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <div>
        <Button>+ Add Project</Button>
      </div>

      <ul className="mt-8">
        {newProject.map((project) => {
          let stylingCSSButton =
            "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";
          if (project.id === isNewProject) {
            stylingCSSButton += " bg-stone-800 text-stone-200";
          } else {
            stylingCSSButton += " text-stone-400";
          }
          return (
            <li key={project.id} className="flex justify-between my-4">
              <button
                onClick={() => handleProjectSelected(project.id)}
                className={stylingCSSButton}
              >
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
