import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Dropdown, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";
import UserStore from "../stores/userStore";

export default observer(function NavBar() {
  const { userStore } = useStore();
  return (
    <Menu inverted fixed="top" size="massive">
      <Menu.Item as={"h3"} header>
        BMS
      </Menu.Item>
      <Menu.Item as={NavLink} to="/errors" name="Errors" />
      <Menu.Item position="right">
        {userStore.isLoggedIn ? (
          <Dropdown
            labeled
            icon="user"
            className="button icon"
            pointing="top left"
            text={userStore.user?.displayName}
          >
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={`/profile/${userStore.user?.username}`}
                text="My Profile"
              />
              <Dropdown.Item
                onClick={userStore.logout}
                text="Logout"
                icon="power"
              />
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <></>
        )}
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
