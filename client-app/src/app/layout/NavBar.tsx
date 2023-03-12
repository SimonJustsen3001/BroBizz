import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default observer(function NavBar() {
  const { userStore } = useStore();
  return (
    <Menu inverted fixed="top" size="massive">
      <Menu.Item as={Link} to={"/"} header>
        BMS
      </Menu.Item>
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
