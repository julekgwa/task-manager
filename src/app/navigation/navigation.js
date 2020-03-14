import React, {
  useState 
} from "react";

import {
  BrowserRouter,
  Route,
  Switch 
} from "react-router-dom";

import {
  Edit 
} from "app/containers/edit";

import {
  Home 
} from "app/containers/home";

import PageNotFound from "app/containers/pageNotFound";

import {
  Reminders 
} from "app/containers/reminders";

import {
  NavBar 
} from "./navbar";

import {
  RoutesLinks 
} from "./routesLinks";

export const Navigation = () => {

  const [active, setActive] = useState(false);

  return (
    <BrowserRouter>
      <NavBar active={active}>
        <RoutesLinks
          toggleMenu={() => setActive(currentValue => !currentValue)}
        />
      </NavBar>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/reminders" component={Reminders} />
        <Route exact path="/edit" component={Edit} />
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );

};
