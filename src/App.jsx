import NewProject from "./Components/NewProject.jsx";
import SideBar from "./Components/SideBar.jsx";

function App() {
  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar />
      <NewProject />
    </main>
  );
}

export default App;
