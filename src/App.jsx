import { useState } from "react";
import SideBar from "./Components/SideBar.jsx";
import NewProject from "./Components/NewProject.jsx";
import NoProject from "./Components/NoProject.jsx";

function App() {
  const [isNewProject, setIsNewProject] = useState(false);
  const [newProject, setNewProject] = useState([]);

  function handleStartProject() {
    setIsNewProject(true);
  }
  function cancelNewProject() {
    setIsNewProject(false);
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar onClick={handleStartProject} projects={newProject} />
      {isNewProject ? (
        <NewProject onCancel={cancelNewProject} onSave={setNewProject} />
      ) : (
        <NoProject onClick={handleStartProject} />
      )}
    </main>
  );
}

export default App;
