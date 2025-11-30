import { useState } from "react";
import SideBar from "./Components/SideBar.jsx";
import NewProject from "./Components/NewProject.jsx";
import NoProject from "./Components/NoProject.jsx";
import TasksContainer from "./Components/TasksContainer.jsx";

function App() {
  const [isNewProject, setIsNewProject] = useState(-2);
  // -2 : no project
  // -1 : new project is made
  // else: index : selected project
  const [newProject, setNewProject] = useState([]);
  const [tasksCollection, setTasksCollection] = useState([]);

  function cancelNewProject() {
    setIsNewProject(-2); // return to no project
  }
  function handleStartProject() {
    setIsNewProject(-1); // create new project button is clicked
  }
  function handleProjectSelected(index) {
    setIsNewProject(index); // project is selected
  }
  function handleDeleteProject(projectId) {
    setIsNewProject(-2);
    setNewProject((projects) =>
      projects.filter((project) => project.id !== projectId)
    );
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

  let content;
  if (isNewProject === -2) {
    content = <NoProject startNewProject={handleStartProject} />;
  } else if (isNewProject === -1) {
    content = (
      <NewProject
        onCancel={cancelNewProject}
        onSave={setNewProject}
        id={newProject.length}
      />
    );
  } else {
    content = (
      <TasksContainer
        project={newProject[isNewProject]}
        tasks={tasksCollection}
        deleteProject={handleDeleteProject}
        onSaveTask={saveTasks}
        deleteTask={handleDeleteTask}
      />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar
        projects={newProject}
        projectSelectedId={isNewProject}
        onStartProject={handleStartProject}
        onProjectSelected={handleProjectSelected}
      />

      {content}
    </main>
  );
}

export default App;
