import React, { Component } from 'react';
import { render } from 'react-dom';
import { Grid } from 'semantic-ui-react';
import CreateUserDialog from './createUser.jsx';

class App extends Component {
  
  render() {
    
    const gridStyle = { height: '100%' }
    
    return (
      <Grid centered verticalAlign='middle' columns={2} style={gridStyle}>
        <Grid.Column>
          <CreateUserDialog />
        </Grid.Column>
      </Grid>
    )
  }9
}

export default App;