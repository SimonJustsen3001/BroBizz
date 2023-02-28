import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { BroBizz } from "../models/brobizz";
import NavBar from "./NavBar";
import { Container, List } from "semantic-ui-react";
import classes from "./App.module.css";
import { Link } from "react-router-dom";
import BroBizzForm from "../../features/form/BroBizzForm";
import BroBizzButtons from "../../features/BroBizz/Buttons";

function App() {
  const [broBizzs, setBroBizzs] = useState<BroBizz[]>([]);
  const [modalVisibility, setModalVisibility] = useState(false);

  const onClickAddHandler = () => {
    setModalVisibility(true);
  };

  useEffect(() => {
    axios.get<BroBizz[]>("https://localhost:7029/brobizz").then((response) => {
      console.log(response);
      setBroBizzs(response.data);
    });
  }, []);

  return (
    <>
      <NavBar />
      {modalVisibility && (
        <Container style={{ marginTop: "7em" }}>
          <BroBizzForm />
        </Container>
      )}
      <Container style={{ marginTop: "7em" }}>
        <div className={classes.buttongrid}>
          <BroBizzButtons onClickAdd={onClickAddHandler} />
        </div>
        {broBizzs.length > 0 ? (
          <div className={classes.grid}>
            {broBizzs.map((brobizz) => (
              <List.Item key={brobizz.id} className={classes.block}>
                {brobizz.name}
                <br />
                {brobizz.id}
              </List.Item>
            ))}
          </div>
        ) : (
          <div className={classes.grid}>Currently loading Brobizz...</div>
        )}
      </Container>
    </>
  );
}

export default App;
