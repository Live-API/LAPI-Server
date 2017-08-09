import React, { Component } from 'react';
import { render } from 'react-dom';
import { Grid } from 'semantic-ui-react';
import axios from 'axios';
import CreateUserDialog from './createUser.jsx';
import InfoDialog from './dialog.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.firstTime === 'true' ? 'createAdmin' : 'login'
    }
  }

  // POSTS to server to create the initial admin user
  async createAdmin(data) {
    const route = '/config/admin';
//    const request = new XMLHttpRequest();
//    request.open('POST', route, true);
//    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
//    request.send(data);
    try {
      console.log(await axios.post(route, data));
    }
    catch (err) {
      console.log(err);
    }
  }

  render() {

    // Is this the first time to this page?
    let card;
    // Display user creation dialog
    if (this.state.status === 'createAdmin')
      card = <CreateUserDialog type='administrator' submission={this.createAdmin}/>;
    // Display the info dialog
    else if (this.state.status === 'login')
      card = <InfoDialog header='Configuration' description='Administrator account already exists.' link='http://github.com/live-api/las/' linkText='Take me to the documentation'/>;
    // So grid elements are centered on entire page
    const gridStyle = { height: '100%' }
    return (
      <Grid centered verticalAlign='middle' columns={2} style={gridStyle}>
        <Grid.Column>
          {card}
        </Grid.Column>
      </Grid>
    )
  }
}

export default App;
