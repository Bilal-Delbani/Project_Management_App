import { useContext } from "react";
import SideBar from "./Components/SideBar.jsx";
import NewProject from "./Components/NewProject.jsx";
import NoProject from "./Components/NoProject.jsx";
import TasksContainer from "./Components/TasksContainer.jsx";
import { ProjectManagementContext } from "./contexts/project-management-context.jsx";

function App() {
  const { isNewProject } = useContext(ProjectManagementContext);

  let content;
  if (isNewProject === -2) {
    content = <NoProject />;
  } else if (isNewProject === -1) {
    content = <NewProject />;
  } else {
    content = <TasksContainer />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar />

      {content}
    </main>
  );
}

export default App;
