import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default function NavBar() {
  return (
    <Menu inverted fixed="top">
      <Menu.Item as={"h3"} header>
        BMS
      </Menu.Item>
      <Menu.Item as={NavLink} to="/errors" name="Errors" />
    </Menu>
  );
}

/*
            <Container >
                <Menu.Item>
                    <Button positive content='Create activity'/>
                </Menu.Item>
            </Container>
*/
