import React, { Component } from 'react';
import { render } from 'react-dom';
import { Grid } from 'semantic-ui-react';
import axios from 'axios';
import CreateUserDialog from './createUser.jsx';
import InfoDialog from './dialog.jsx';
import Dashboard from './miniDashboard.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status
    }
    this.createAdmin = this.createAdmin.bind(this);
    this.createUser = this.createUser.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }

  // POSTS to server to create the initial admin user
  async createAdmin(data) {
    const route = '/config/admin';
    try {
      const status = (await axios.post(route, data)).data.status;
      if (status === 'OK') this.setState({
        status: 'dashboard',
        message: 'Account successfully created'
      });
    }
    catch (err) {
      console.log(err);
    }
  }

  // POSTS to server to create a user
  async createUser(data) {
    // Extract invite ID from URL
    data.inviteId = window.location.href.match(/[^\/]+(?=\/$|$)/)[0];
    const route = '/users';
    try {
      const status = (await axios.post(route, data)).data.status;
      if (status === 'OK') this.setState({
        status: 'dashboard',
        message: 'Account successfully created'
      });
    }
    catch (err) {
      console.log(err);
    }
  }

  // POSTS to server to log in
  async authenticate(data) {
    const route = '/auth';
    try {
      const response = (await axios.post(route, data));
      if (response.status === 200) this.setState({
        status: 'dashboard',
        message: 'Successfully logged in'
      });
      else this.setState({error: 'Incorrect Username or Password'});
    }
    catch (err) {
      console.log(err);
    }
  }

  render() {

    // Is this the first time to this page?
    let content;
    // Display user creation dialog
    if (this.state.status === 'createAdmin')
      content = <Grid.Column width={8}><CreateUserDialog description='Create Initial Administrator' submission={this.createAdmin}/></Grid.Column>;
    // Display user creation dialog
    else if (this.state.status === 'createUser')
      content = <Grid.Column width={8}><CreateUserDialog description='Create User' submission={this.createUser}/></Grid.Column>;
    // Display the info dialog
    else if (this.state.status === 'login')
      content = <Grid.Column width={8}><CreateUserDialog description='Sign In' submission={this.authenticate}/></Grid.Column>;
        else if (this.state.status === 'dashboard')
      content = <Grid.Column width={16}><Dashboard message={this.state.message}/></Grid.Column>;
    // So grid elements are centered on entire page
    const gridStyle = { height: '100%', margin: 0}
    return (
      <Grid centered verticalAlign='middle' celled style={gridStyle}>
          {content}
      </Grid>
    )
  }
}

export default App;
