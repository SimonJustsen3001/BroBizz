import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import RegisterForm from "../form/RegisterForm";
import LoginForm from "../users/LoginForm";

export default observer(function HomePage() {
  const { userStore, modalStore } = useStore();
  return (
    <Segment textAlign="center" vertical className="masthead">
      <Container text style={{ marginTop: "7em" }}>
        <h1>Home page</h1>
        {userStore.isLoggedIn ? (
          <>
            <Header>Welcome to BroBizz Management System</Header>
            <Button as={Link} to="/brobizz" size="huge">
              Manage BroBizzs!
            </Button>
          </>
        ) : (
          <>
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
