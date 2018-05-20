import React from 'react';
import { Header, Menu, Button } from 'semantic-ui-react';
import icon from '../assets/icon.png';

const AppHeader = props => (
  <Menu fixed="top" style={{ height: 60 }}>
    <Menu.Item>
      <Header>
        <img src={icon} />
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
