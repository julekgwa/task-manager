import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {Component} from "react";

import {Button} from "app/elements/button/button";
import {Header} from "app/elements/header/header";
import {withLogger} from "app/hoc/withLogger";
import {Colors} from "app/styles/colors";

class TodoHome extends Component {

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

export const Home = withLogger(TodoHome);
