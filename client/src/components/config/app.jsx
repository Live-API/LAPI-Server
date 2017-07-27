import React, { Component } from 'react';
import { render } from 'react-dom';
import { Grid } from 'semantic-ui-react';
import CreateUserDialog from './createUser.jsx';

class App extends Component {
  
  // POSTS to server to create the initial admin user
  createAdmin(data) {
//    const route = '/config/admin';
//    const request = new XMLHttpRequest();
//    request.open('POST', route, true);
//    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
//    request.send(data);
    console.log('A user was submitted:', data);
  }
  
  render() {
    // So grid elements are centered on entire page
    const gridStyle = { height: '100%' }
    return (
      <Grid centered verticalAlign='middle' columns={2} style={gridStyle}>
        <Grid.Column>
          <CreateUserDialog type='administrator' submission={this.createAdmin}/>
        </Grid.Column>
      </Grid>
    )
  }
}

export default App;