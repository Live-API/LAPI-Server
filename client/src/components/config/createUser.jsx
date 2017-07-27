import React, { Component } from 'react';
import { render } from 'react-dom';
import { Card, Input, Divider, Button } from 'semantic-ui-react'

const CreateUserDialog = () => (
  <Card fluid color='black'>
    <Card.Content>
      <Card.Header>
        Create User
      </Card.Header>
    </Card.Content>
    <Card.Content>
      <Input fluid icon='Add User' iconPosition='left' placeholder='Username' />
      <Divider hidden />
      <Input fluid icon='Lock' iconPosition='left' placeholder='Password' />
      <Divider />
      <Button fluid>Register</Button>
    </Card.Content>
  </Card>
)

export default CreateUserDialog;