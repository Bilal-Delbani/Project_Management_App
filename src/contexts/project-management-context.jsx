import { useState, createContext, useReducer } from "react";

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

function projectManagementReducer(state, action) {
  if (action.type === "START_NEW_PROJECT") {
    return { ...state, isNewProject: action.isNewProject };
  } else if (action.type === "CANCEL_NEW_PROJECT") {
    return { ...state, isNewProject: action.isNewProject };
  } else if (action.type === "PROJECT_SELECTED") {
    return { ...state, isNewProject: action.isNewProject };
  } else if (action.type === "SAVE_PROJECT") {
    return { ...state, newProject: [...state.newProject, action.project] };
  } else if (action.type === "DELETE_PROJECT") {
    const updatedArray = [...state.newProject];
    const filterArray = updatedArray.filter(
      (project) => project.id !== action.projectId
    );
    const mappedArray = filterArray.map((project, index) => ({
      ...project,
      id: index,
    }));

    const updatedTasks = [...state.tasksCollection];
    const filteredTasks = updatedTasks.filter(
      (task) => task.projectId !== action.projectId
    );
    const mappedTasks = filteredTasks.map((task, index) => ({
      ...task,
      projectId: index,
    }));

    return {
      ...state,
      isNewProject: action.isNewProject,
      newProject: mappedArray,
      tasksCollection: mappedTasks,
    };
  } else if (action.type === "SAVE_TASK") {
    return {
      ...state,
      tasksCollection: [...state.tasksCollection, action.task],
    };
  } else if (action.type === "DELETE_TASK") {
    const DeletedTask = [...state.tasksCollection];
    const filteredDeletedTask = DeletedTask.filter(
      (task) => task.id !== action.taskId
    );
    return { ...state, tasksCollection: filteredDeletedTask };
  }
}

export default function ProjectManagementProvider({ children }) {
  const [projectManagementState, projectManagementDispatch] = useReducer(
    projectManagementReducer,
    {
      newProject: [],
      tasksCollection: [],
      isNewProject: -2,
      // -2 : no project
      // -1 : new project is made
      // else: index : selected project
    }
  );

  function handleStartProject() {
    projectManagementDispatch({
      type: "START_NEW_PROJECT",
      isNewProject: -1, // create new project button is clicked
    });
  }
  function cancelNewProject() {
    projectManagementDispatch({
      type: "CANCEL_NEW_PROJECT",
      isNewProject: -2, // return to no project
    });
  }

  function handleProjectSelected(index) {
    projectManagementDispatch({
      type: "PROJECT_SELECTED",
      isNewProject: index, // project is selected
    });
  }

  function onSave(project) {
    projectManagementDispatch({
      type: "SAVE_PROJECT",
      project: project,
    });
  }

  function handleDeleteProject(projectId) {
    projectManagementDispatch({
      type: "DELETE_PROJECT",
      projectId: projectId,
      isNewProject: -2,
    });
  }

  function saveTasks(enteredTask) {
    projectManagementDispatch({
      type: "SAVE_TASK",
      task: {
        projectId: projectManagementState.isNewProject,
        id: projectManagementState.tasksCollection.length,
        name: enteredTask,
      },
    });
  }

  function handleDeleteTask(taskId) {
    projectManagementDispatch({
      type: "DELETE_TASK",
      taskId: taskId,
    });
  }

  const prjCTX = {
    isNewProject: projectManagementState.isNewProject,
    newProject: projectManagementState.newProject,
    tasksCollection: projectManagementState.tasksCollection,

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
