import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";

function App() {
  return (
    <>
      <NavBar />{" "}
      <Container style={{ marginTop: "7em" }}>
        <Outlet />
      </Container>
      <ToastContainer position="bottom-right" theme="colored" />
    </>
  );
}

export default App;
