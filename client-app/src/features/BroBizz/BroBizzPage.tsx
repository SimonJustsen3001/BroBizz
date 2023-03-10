import { observer } from "mobx-react-lite";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Segment,
} from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import RegisterForm from "../form/RegisterForm";
import LoginForm from "../form/LoginForm";
import CreateForm from "../form/CreateForm";
import classes from "./BroBizzPage.module.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingComponent from "../../app/layout/LoadingComponent";
import InvoiceStore from "../../app/stores/invoiceStore";

export default observer(function BroBizzPage() {
  const { userStore, modalStore, brobizzStore, invoiceStore } = useStore();

  useEffect(() => {
    brobizzStore.loadBroBizzs();
    invoiceStore.loadInvoices();
  }, [brobizzStore, invoiceStore]);

  return (
    <Grid celled columns={2} stackable textAlign="center">
      <Grid.Row>
        <Grid.Column width={9}>
          <Header>BroBizz Overview</Header>
        </Grid.Column>
        <Grid.Column width={6}>
          <Header>Invoices</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row verticalAlign="middle">
        <Grid.Column width={9}>
          {userStore.isLoggedIn ? (
            <>
              <Button
                style={{ marginBottom: 8 }}
                size="large"
                color="green"
                className={classes.animate}
                onClick={() => modalStore.openModal(<CreateForm />)}
              >
                Add BroBizz
              </Button>
              {!brobizzStore.loadingInitial ? (
                <Grid columns={3} stretched>
                  {brobizzStore.brobizzs.map((brobizz) => (
                    <Grid.Column key={brobizz.id}>
                      <Segment
                        inverted
                        circular
                        color="green"
                        className={classes.animate}
                        as={Link}
                        to={brobizz.id}
                      >
                        {brobizz.name}
                      </Segment>
                    </Grid.Column>
                  ))}
                </Grid>
              ) : (
                <LoadingComponent content="Loading BroBizzs..." />
              )}
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
        </Grid.Column>
        <Grid.Column width={6} stretched>
          {invoiceStore.invoices.map((invoice) => (
            <Segment
              raised
              inverted
              color="green"
              className={classes.animate}
              as={Link}
              to={`/invoice/${invoice.id}`}
            >
              {invoice.invoiceDate.toString().split("T")[0]}{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;
              {invoice.price} dkk
            </Segment>
          ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
});
