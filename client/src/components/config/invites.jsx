import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { Container, Button, Input } from 'semantic-ui-react'

// A form for creation of invites
class Invites extends Component {
  constructor() {
    super()
    this.generateInvite = this.generateInvite.bind(this);
    this.state = { inviteId: null };
  }

  async generateInvite() {
    const route = '/invites';
    try {
      const response = (await axios.post(route, {}));
      if (response.status === 200) this.setState({ inviteId: response.data });
      console.log(this.state.inviteId);
    }
    catch (err) {
      console.log(err);
    }
  }

  render() {
    return  (
      <Container>
        <Button
          content='Create Invite Link'
          icon='mail'
          attached='left'
          onClick={this.generateInvite}
        />
        <Input
          action={{ color: 'teal', labelPosition: 'right', icon: 'copy', content: 'Copy' }}
          placeholder={this.state.inviteId ? `/invites/${this.state.inviteId}` : '' }
          disabled
        />
      </Container>
    );
  }
}

export default Invites;
