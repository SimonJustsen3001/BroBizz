import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { Button, Container, Grid, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import RegisterForm from "../form/RegisterForm";
import LoginForm from "../form/LoginForm";
import CreateForm from "../form/CreateForm";
import classes from "./Trip.module.css";
import { useEffect } from "react";

export default observer(function TripPage() {
  const { userStore, modalStore, tripStore } = useStore();

  const { id } = useParams();
  useEffect(() => {
    tripStore.loadTrip(id!);
  }, [tripStore]);

  return (
    <Segment textAlign="center" vertical className="masthead">
      <Container text style={{ marginTop: "7em" }}>
        {userStore.isLoggedIn ? (
          <>
            <Grid columns="equal">
              <Grid.Row>
                <Grid.Column>
                  <Segment inverted color="green" textAlign="center">
                    <p className={classes.title}>Travel Details</p>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row stretched>
                <Grid.Column>
                  <Segment
                    inverted
                    color="green"
                    circular
                    floated="left"
                    raised
                  >
                    <p className={classes.title}>
                      {tripStore.selectedTrip?.bridge.name}
                    </p>
                    <p className={classes.text}>
                      {
                        tripStore.selectedTrip?.invoice.supplyDate
                          .toString()
                          .split("T")[0]
                      }
                    </p>
                  </Segment>
                  <Segment
                    inverted
                    color="green"
                    secondary
                    circular
                    floated="left"
                    raised
                  >
                    <p className={classes.smalltitle}>
                      {tripStore.selectedTrip?.vehicle.licensePlate}
                    </p>
                    <p className={classes.text}>
                      {tripStore.selectedTrip?.vehicle.type}
                    </p>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Segment inverted color="green" tertiary>
                    Insert Picture here
                  </Segment>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Segment inverted color="green">
                    <p className={classes.smalltitle}>Invoice Details</p>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid columns="equal" divided padded>
                  <Grid.Row textAlign="left">
                    <Grid.Column>
                      <Segment inverted color="green">
                        <p className={classes.billingtitle}>Billed to</p>
                        <p className={classes.text}>
                          {tripStore.selectedTrip?.invoice.customerName}
                        </p>
                        <p className={classes.text}>
                          {tripStore.selectedTrip?.invoice.customerAddress}
                        </p>
                      </Segment>
                    </Grid.Column>
                    <Grid.Column>
                      <Segment inverted color="green">
                        <p className={classes.billingtitle}>Billed from</p>
                        <p className={classes.text}>
                          {tripStore.selectedTrip?.invoice.companyName}
                        </p>
                        <p className={classes.text}>
                          {tripStore.selectedTrip?.invoice.companyAddress}
                        </p>
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row textAlign="left">
                    <Grid.Column width={4}>
                      <Segment inverted color="green">
                        <p className={classes.text}>Invoice Date</p>
                      </Segment>
                      <Segment inverted color="green">
                        <p className={classes.text}>Supply Date</p>
                      </Segment>
                      <Segment inverted color="green">
                        <p className={classes.text}>Invoice No.</p>
                      </Segment>
                    </Grid.Column>
                    <Grid.Column>
                      <Segment inverted color="green">
                        <p className={classes.text}>
                          {
                            tripStore.selectedTrip?.invoice.invoiceDate
                              .toString()
                              .split("T")[0]
                          }
                        </p>
                      </Segment>
                      <Segment inverted color="green">
                        <p className={classes.text}>
                          {
                            tripStore.selectedTrip?.invoice.supplyDate
                              .toString()
                              .split("T")[0]
                          }
                        </p>
                      </Segment>
                      <Segment inverted color="green">
                        <p className={classes.text}>
                          {tripStore.selectedTrip?.invoice.id}
                        </p>
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Row>
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
