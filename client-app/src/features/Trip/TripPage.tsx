import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { Button, Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import RegisterForm from "../form/RegisterForm";
import LoginForm from "../form/LoginForm";
import CreateForm from "../form/CreateForm";
import classes from "./TripPage.module.css";
import { useEffect } from "react";

export default observer(function TripPage() {
  const { userStore, modalStore, tripStore } = useStore();

  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    tripStore.loadTrips(id!);
  }, [tripStore]);

  return (
    <Segment textAlign="center" vertical className="masthead">
      <Container text style={{ marginTop: "7em" }}>
        {userStore.isLoggedIn ? (
          <>
            <Header>Brobizz "Insert current id here"</Header>
            <div className={classes.buttongrid}>
              <Button
                size="huge"
                className={classes.button}
                onClick={() => modalStore.openModal(<CreateForm />)}
              >
                Add BroBizz
              </Button>
              <Button
                size="huge"
                className={classes.button}
                onClick={() => modalStore.openModal(<CreateForm />)}
              >
                Add BroBizz
              </Button>
            </div>
            <div className={classes.grid}>
              {tripStore.trips.map((trip) => (
                <Link key={trip.id} className={classes.block} to={trip.id}>
                  <p className={classes.text}>{trip.id}</p>
                </Link>
              ))}
            </div>
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
