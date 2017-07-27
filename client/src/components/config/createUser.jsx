import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button } from 'semantic-ui-react'

class CreateUserDialog extends Component {
  render() {
    return (
      <div>
        <form>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <Button>click here!</Button>
      </div>
    )
  }
}

export default CreateUserDialog;