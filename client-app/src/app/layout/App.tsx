import { Outlet } from "react-router-dom";
import LoadingComponent from "./LoadingComponent";
import NavBar from "./NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
