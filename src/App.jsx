import { useState } from "react";
import SideBar from "./Components/SideBar.jsx";
import NewProject from "./Components/NewProject.jsx";
import NoProject from "./Components/NoProject.jsx";

function App() {
  const [newProject, setNewProject] = useState(false);

  function handleClick() {
    setNewProject(true);
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar onClick={handleClick} />
      {newProject ? <NewProject /> : <NoProject onClick={handleClick}/>}
    </main>
  );
}

export default App;
