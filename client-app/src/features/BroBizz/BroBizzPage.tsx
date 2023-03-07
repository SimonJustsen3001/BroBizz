import { observer } from "mobx-react-lite";
import { Button, Container, Grid, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import RegisterForm from "../form/RegisterForm";
import LoginForm from "../form/LoginForm";
import CreateForm from "../form/CreateForm";
import classes from "./BroBizzPage.module.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default observer(function BroBizzPage() {
  const { userStore, modalStore, brobizzStore } = useStore();

  useEffect(() => {
    brobizzStore.loadBroBizzs();
  }, [brobizzStore]);

  return (
    <Segment textAlign="center" vertical className="masthead">
      <Container text>
        {userStore.isLoggedIn ? (
          <>
            <Header>BroBizz Overview</Header>
            <div className={classes.buttongrid}>
              <Button
                size="huge"
                className={classes.button}
                onClick={() => modalStore.openModal(<CreateForm />)}
              >
                Add BroBizz
              </Button>
            </div>
            <Grid columns={3} stretched>
              {brobizzStore.brobizzs.map((brobizz) => (
                <Grid.Column key={brobizz.id}>
                  <Segment
                    raised
                    inverted
                    circular
                    color="green"
                    as={Link}
                    to={brobizz.id}
                  >
                    {brobizz.name}
                  </Segment>
                </Grid.Column>
              ))}
            </Grid>
          </>
        ) : (
          <>
            <Header>No user registered, please log in or register</Header>
            <Button
              onClick={() => modalStore.openModal(<LoginForm />)}
              size="huge"
            >
              Login!
            </Button>
            <Button
              onClick={() => modalStore.openModal(<RegisterForm />)}
              size="huge"
            >
              Register!
            </Button>
          </>
        )}
      </Container>
    </Segment>
  );
});

/*import React, { useEffect, useState } from "react";
import { Container, List } from "semantic-ui-react";
import BroBizzButtons from "./Buttons";
import LoginForm from "../form/LoginForm";
import classes from "./BroBizzPage.module.css";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../app/layout/LoadingComponent";

function BroBizzPage() {
  const [modalVisibility, setModalVisibility] = useState(false);
  const { brobizzStore, modalStore } = useStore();

  const onClickAddHandler = () => {
    setModalVisibility(true);
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

export default observer(BroBizzPage);*/
