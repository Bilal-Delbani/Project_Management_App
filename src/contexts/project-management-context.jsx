import { useState, createContext } from "react";

export const ProjectManagementContext = createContext({
  newProject: [],
  isNewProject: -2,
  tasksCollection: [],

  handleStartProject: () => {},
  cancelNewProject: () => {},
  handleProjectSelected: () => {},
  onSave: () => {},
  handleDeleteProject: () => {},
  saveTasks: () => {},
  handleDeleteTask: () => {},
});

export default function ProjectManagementProvider({ children }) {
  const [newProject, setNewProject] = useState([]);
  // -2 : no project
  // -1 : new project is made
  // else: index : selected project
  const [isNewProject, setIsNewProject] = useState(-2);
  const [tasksCollection, setTasksCollection] = useState([]);

  function handleStartProject() {
    setIsNewProject(-1); // create new project button is clicked
  }
  function cancelNewProject() {
    setIsNewProject(-2); // return to no project
  }
  function handleProjectSelected(index) {
    setIsNewProject(index); // project is selected
  }
  function onSave(project) {
    setNewProject((prevProjects) => [...prevProjects, project]);
  }
  function handleDeleteProject(projectId) {
    setIsNewProject(-2);
    const updatedArray = [...newProject];
    const filterArray = updatedArray.filter(
      (project) => project.id !== projectId
    );
    const mappedArray = filterArray.map((project, index) => ({
      ...project,
      id: index,
    }));
    setNewProject(mappedArray);

    const updatedTasks = [...tasksCollection];
    const filteredTasks = updatedTasks.filter(
      (task) => task.projectId !== projectId
    );
    const mappedTasks = filteredTasks.map((task, index) => ({
      ...task,
      projectId: index,
    }));
    setTasksCollection(mappedTasks);
  }

  function saveTasks(enteredTask) {
    const task = {
      projectId: isNewProject,
      id: tasksCollection.length,
      name: enteredTask,
    };

    setTasksCollection((prev) => [...prev, task]);
  }

  function handleDeleteTask(taskId) {
    setTasksCollection((tasks) => tasks.filter((task) => task.id !== taskId));
  }

  const prjCTX = {
    isNewProject: isNewProject,
    newProject: newProject,
    tasksCollection: tasksCollection,

    handleStartProject: handleStartProject,
    cancelNewProject: cancelNewProject,
    handleProjectSelected: handleProjectSelected,
    onSave: onSave,
    handleDeleteProject: handleDeleteProject,
    saveTasks: saveTasks,
    handleDeleteTask: handleDeleteTask,
  };
  return (
    <ProjectManagementContext.Provider value={prjCTX}>
      {children}
    </ProjectManagementContext.Provider>
  );
}
