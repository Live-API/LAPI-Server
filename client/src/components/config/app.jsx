import React, { Component } from 'react';
import { render } from 'react-dom';
import { Grid } from 'semantic-ui-react';
import axios from 'axios';
import CreateUserDialog from './createUser.jsx';
import InfoDialog from './dialog.jsx';

class App extends Component {
  constructor(props) {
    super(props);
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
    console.log(this.props);
    
    // Is this the first time to this page?
    const card = this.props.firstTime === 'true' ? 
          
      // Display user creation dialog
      <CreateUserDialog type='administrator' submission={this.createAdmin}/> :
    
      // Display the info dialog
      <InfoDialog header='testHeader' description='testDescription' link='google.com' linkText='google'/>;
    
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