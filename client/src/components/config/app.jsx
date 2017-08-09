import React, { Component } from 'react';
import { render } from 'react-dom';
import { Grid } from 'semantic-ui-react';
import axios from 'axios';
import CreateUserDialog from './createUser.jsx';
import InfoDialog from './dialog.jsx';
import Dashboard from './dashboard.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.firstTime === 'true' ? 'createAdmin' : 'login'
    }
    this.createAdmin = this.createAdmin.bind(this);
  }

  // POSTS to server to create the initial admin user
  async createAdmin(data) {
    console.log(this);
    const route = '/config/admin';
//    const request = new XMLHttpRequest();
//    request.open('POST', route, true);
//    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
//    request.send(data);
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

  render() {

    // Is this the first time to this page?
    let content;
    // Display user creation dialog
    if (this.state.status === 'createAdmin')
      content = <Grid.Column width={8}><CreateUserDialog type='administrator' submission={this.createAdmin}/></Grid.Column>;
    // Display the info dialog
    else if (this.state.status === 'login')
      content = <Grid.Column width={8}>><InfoDialog header='Configuration' description='Administrator account already exists.' link='http://github.com/live-api/las/' linkText='Take me to the documentation'/></Grid.Column>;
    else if (this.state.status === 'dashboard')
      content = <Grid.Column width={15}><Dashboard message={this.state.message}/></Grid.Column>;
    // So grid elements are centered on entire page
    const gridStyle = { height: '100%' }
    return (
      <Grid centered verticalAlign='middle' celled style={gridStyle}>
          {content}
      </Grid>
    )
  }
}

export default App;
