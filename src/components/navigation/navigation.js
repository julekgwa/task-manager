
import Edit from 'containers/edit';
import Home from 'containers/home';
import PageNotFound from 'containers/pageNotFound';
import Reminders from 'containers/reminders';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
