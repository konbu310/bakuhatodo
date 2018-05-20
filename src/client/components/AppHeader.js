import React from 'react';
import { Header, Menu, Button } from 'semantic-ui-react';

const AppHeader = props => (
  <Menu fixed="top" style={{ height: 60 }}>
    <Menu.Item>
      <img src="https://i.gyazo.com/587c50854505823a6bdfb48e0f9a7a5a.png" />
    </Menu.Item>
    <Menu.Item>
      <Header>
        {props.currentUser !== undefined
          ? `${props.currentUser}の爆破ToDo`
          : '爆破ToDo'}
      </Header>
    </Menu.Item>
    {props.MenuBtn ? (
      <Menu.Item position="right">
        <Button basic color="teal" onClick={props.clickBtn}>
          {props.btnValue}
        </Button>
      </Menu.Item>
    ) : null}
  </Menu>
);

export default AppHeader;
