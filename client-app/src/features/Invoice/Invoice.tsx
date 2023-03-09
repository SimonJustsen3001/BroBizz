import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import classes from "./Invoice.module.css";

export default observer(function Invoice() {
  const { invoiceStore } = useStore();
  const { id } = useParams();
  useEffect(() => {
    invoiceStore.loadInvoice(id!);
  }, [invoiceStore]);
  return (
    <Grid columns="equal" divided padded>
      <Grid.Row textAlign="left">
        <Grid.Column>
          <Segment inverted color="green">
            <p className={classes.billingtitle}>Billed to</p>
            <p className={classes.text}>
              {invoiceStore.selectedInvoice?.customerName}
            </p>
            <p className={classes.text}>
              {invoiceStore.selectedInvoice?.customerAddress}
            </p>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment inverted color="green">
            <p className={classes.billingtitle}>Billed from</p>
            <p className={classes.text}>
              {invoiceStore.selectedInvoice?.companyName}
            </p>
            <p className={classes.text}>
              {invoiceStore.selectedInvoice?.companyAddress}
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
            <p className={classes.text}>Price</p>
          </Segment>
          <Segment inverted color="green">
            <p className={classes.text}>Invoice No.</p>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment inverted color="green">
            <p className={classes.text}>
              {
                invoiceStore.selectedInvoice?.invoiceDate
                  .toString()
                  .split("T")[0]
              }
            </p>
          </Segment>
          <Segment inverted color="green">
            <p className={classes.text}>
              {
                invoiceStore.selectedInvoice?.supplyDate
                  .toString()
                  .split("T")[0]
              }
            </p>
          </Segment>
          <Segment inverted color="green">
            <p className={classes.text}>
              {invoiceStore.selectedInvoice?.price} dkk.
            </p>
          </Segment>
          <Segment inverted color="green">
            <p className={classes.text}>{invoiceStore.selectedInvoice?.id}</p>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
});
