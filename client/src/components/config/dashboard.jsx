import React, { Component } from 'react';
import { render } from 'react-dom';
import { Card, Input, Divider, Button, Form, Icon } from 'semantic-ui-react'

const Dashboard = (props) => {
  return  (
    <Card fluid color='red'>
      <Card.Content>
        <Card.Header>
          Dashboard!
        </Card.Header>
      </Card.Content>
      <Card.Content description='Pizza!' />
      <Card.Content extra>
        {props.message}
      </Card.Content>
    </Card>
  );
}

export default Dashboard;
