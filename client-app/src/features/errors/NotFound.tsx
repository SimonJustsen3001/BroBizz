import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import classes from "./NotFound.module.css";

export default function NotFound() {
  return (
    <Segment placeholder className={classes.text}>
      <Header>
        <Icon name="search" />
        <br />
        Oops - we've looked everywhere but could not find what you are looking
        for!
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/brobizz">
          Return to home page
        </Button>
      </Segment.Inline>
    </Segment>
  );
}
