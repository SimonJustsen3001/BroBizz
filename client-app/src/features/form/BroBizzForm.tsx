import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import classes from "./BroBizzForm.module.css";

export default function BroBizzForm() {
  return (
    <Form className={classes.form}>
      <Form.Input placeholder="Name" />
      <Button
        floated="right"
        positive
        type="submit"
        content="Add"
        className={classes.button}
      />
      <Button floated="right" type="button" content="Cancel" />
    </Form>
  );
}
