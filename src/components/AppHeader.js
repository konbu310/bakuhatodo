import React from 'react';
import { Header, Menu, Button } from 'semantic-ui-react';

const AppMenu = props => (
  <Menu fixed="top">
    <Menu.Item />
    <Menu.Item>
      <Header>爆破ToDo</Header>
    </Menu.Item>
    <Menu.Item position="right">
      <Button onClick={props.addData}>新規タスク</Button>
    </Menu.Item>
  </Menu>
);

export default AppMenu;
