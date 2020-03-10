import React, { Component } from 'react';

import { Header } from 'app/navigation/navbar';
import { RoutesLinks } from 'app/navigation/routesLinks';

export class Edit extends Component {
  state = {
    isActive: false
  };

  toggleMenu = () => {
    this.setState(prevState => ({ isActive: !prevState.isActive }));
  };
  render = () => {
    return (
      <>
        <Header active={this.state.isActive}>
          <RoutesLinks toggleMenu={this.toggleMenu} />
        </Header>
        <h1>Edit</h1>
      </>
    );
  };
}
