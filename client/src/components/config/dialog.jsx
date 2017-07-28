import React, { Component } from 'react';
import { render } from 'react-dom';
import { Card, Input, Divider, Button, Form, Icon } from 'semantic-ui-react'

const InfoDialog = (props) => {  
  return  (
    <Card fluid color='red'>
      <Card.Content>
        <Card.Header>
          {props.header}
        </Card.Header>
      </Card.Content>
      <Card.Content description={props.description} />
      <Card.Content extra>
        <a href={props.link}>{props.linkText}</a>
      </Card.Content>
    </Card>
  );
}

export default InfoDialog;