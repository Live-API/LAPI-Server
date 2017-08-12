import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Container, Button, Input } from 'semantic-ui-react'

// A form for creation of invites
class Invites extends Component {
  constructor() {
    super()
    this.generateInvite = this.generateInvite.bind(this);
    this.state = { inviteId: null };
    this.domain = window.location.href.match(/(https?:\/\/[^\/]*)/)[0];
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
    const content = this.state.inviteId ? 'Copy Link' : 'Generate Invite Link';
    const onClick = this.state.inviteId ? console.log : this.generateInvite;
    const otherAttrs = {};
    const inviteUrl = `${this.domain}/invites/${this.state.inviteId}`;
    if (this.state.inviteId) otherAttrs.label = inviteUrl;

    const button = <Button
      content= {content}
      icon='mail'
      onClick= {onClick}
      {...otherAttrs}
    />;


  // If the invite has been generated, wrap the button in a CopyToClipboard
    return this.state.inviteId ? (
      <Container>
        <CopyToClipboard text={inviteUrl}>
          {button}
        </CopyToClipboard>
      </Container>
    ) : (
      <Container>
        {button}
      </Container>
    );
  }
}

export default Invites;
