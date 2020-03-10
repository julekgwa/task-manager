
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Edit from 'app/containers/edit';
import Home from 'app/containers/home';
import PageNotFound from 'app/containers/pageNotFound';
import Reminders from 'app/containers/reminders';

const Navigation = () => {
  return (
    <BrowserRouter>

      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/reminders' component={Reminders} />
        <Route exact path='/edit' component={Edit} />
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Navigation;
