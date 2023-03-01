import React, { useEffect, useState } from "react";
import { BroBizz } from "./brobizzInterface";
import { Container, List } from "semantic-ui-react";
import BroBizzButtons from "./Buttons";
import LoginForm from "../users/LoginForm";
import classes from "./BroBizzPage.module.css";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../app/layout/LoadingComponent";

function BroBizzPage() {
  const [broBizzs, setBroBizzs] = useState<BroBizz[]>([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const { brobizzStore } = useStore();

  const onClickAddHandler = () => {
    setModalVisibility(true);
  };

  const onClickCancelHandler = () => {
    setModalVisibility(false);
  };

  useEffect(() => {
    brobizzStore.loadBroBizzs();
  }, [brobizzStore]);

  if (brobizzStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;

  return (
    <div style={{ marginTop: "20pe" }}>
      {modalVisibility && (
        <Container style={{ marginTop: "7em" }}>
          <LoginForm />
        </Container>
      )}
      <Container style={{ marginTop: "7em" }}>
        <div className={classes.buttongrid}>
          <BroBizzButtons
            onClickAdd={onClickAddHandler}
            onClickCancel={onClickAddHandler}
          />
        </div>
        {
          <div className={classes.grid}>
            {brobizzStore.brobizzs.map((brobizz) => (
              <List.Item key={brobizz.id} className={classes.block}>
                {brobizz.name}
                <br />
                {brobizz.id}
              </List.Item>
            ))}
          </div>
        }
      </Container>
    </div>
  );
}

export default observer(BroBizzPage);

/* : (
          <div className={classes.grid}>Currently loading Brobizz...</div>
        )*/
