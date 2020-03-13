import React, { Component } from "react";

import { Header } from "app/elements/header/header";
import { withLogger } from "app/hoc/withLogger";

class TodoReminders extends Component {

  render = () => {

    return (
      <>
        <Header>Reminders</Header>
      </>
    );
  
  };

}

export const Reminders = withLogger(TodoReminders);
