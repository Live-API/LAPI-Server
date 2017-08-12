import React, { Component } from 'react';
import { render } from 'react-dom';
import { Card, Menu, Label } from 'semantic-ui-react';
import Invites from './invites.jsx';

const Dashboard = (props) => {
  let message = null;
  if (props.message) message = <Menu.Item><Label>{props.message}</Label></Menu.Item>;

  return  (
    <Card fluid color='red'>
      <Card.Content>
        <Card.Header>
          LiveAPI Dashboard
          {message}
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Invites />
      </Card.Content>
      <Card.Content extra>
        <a href="https://github.com/Live-API/LAS">Documentation</a>
      </Card.Content>
    </Card>
  );
}

export default Dashboard;
