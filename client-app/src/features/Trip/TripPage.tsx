import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { Button, Container, Grid, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import RegisterForm from "../form/RegisterForm";
import LoginForm from "../form/LoginForm";
import CreateForm from "../form/CreateForm";
import classes from "./TripPage.module.css";
import { useEffect } from "react";

export default observer(function TripPage() {
  const { userStore, modalStore, tripStore } = useStore();

  const { id } = useParams();
  useEffect(() => {
    tripStore.loadTrips(id!);
  }, [tripStore]);

  return (
    <Segment textAlign="center" vertical className="masthead">
      <Container text>
        {userStore.isLoggedIn ? (
          <>
            <Header>
              <strong>Brobizz:</strong> {id}
            </Header>
            <Grid columns={3} stretched>
              {tripStore.trips.map((trip) => (
                <Grid.Column key={trip.id}>
                  <Segment
                    raised
                    inverted
                    circular
                    color="green"
                    className={classes.trip}
                    as={Link}
                    to={`/trip/${trip.id}`}
                  >
                    <h3>{trip.bridge.name}</h3>
                    {trip.vehicle.type}
                    <br />
                    {trip.vehicle.licensePlate}
                    <br />
                    {trip.invoice.supplyDate.toString().split("T")[0]}
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
