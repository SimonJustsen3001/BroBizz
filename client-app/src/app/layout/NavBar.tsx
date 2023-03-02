import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Dropdown, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default observer(function NavBar() {
  const {
    userStore: { user, logout },
  } = useStore();
  return (
    <Menu inverted fixed="top" size="massive">
      <Menu.Item as={"h3"} header>
        BMS
      </Menu.Item>
      <Menu.Item as={NavLink} to="/errors" name="Errors" />
      <Menu.Item position="right">
        <Dropdown
          labeled
          icon="user"
          className="button icon"
          pointing="top left"
          text={user?.displayName}
        >
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to={`/profile/${user?.username}`}
              text="My Profile"
            />
            <Dropdown.Item onClick={logout} text="Logout" icon="power" />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </Menu>
  );
});

/*
            <Container >
                <Menu.Item>
                    <Button positive content='Create activity'/>
                </Menu.Item>
            </Container>
*/
