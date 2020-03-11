import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';

import { Button } from 'app/elements/button/button';
import { Header } from 'app/elements/header/header';
import { Colors } from 'app/styles/colors';

export class Home extends Component {
  render = () => {
    return (
      <>
        <Header color={Colors.softOrange}>Home</Header>
        <Button circle>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </>
    );
  };
}
