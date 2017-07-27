import React, { Component } from 'react';
import { render } from 'react-dom';
import CreateUserDialog from './createUser.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <h1>App</h1>
        <CreateUserDialog />
      </div>
    )
  }9
}

export default App;