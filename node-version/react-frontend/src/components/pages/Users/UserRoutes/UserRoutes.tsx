import * as React from "react";
import { Switch, Route, Redirect } from "react-router";

import AboutUs from "../AboutUs";
import Home from "components/pages/Users/Home";

import ScrollToTop from "components/common/ScrollToTop";

function UserRoutes() {
  return (
    <>
      <ScrollToTop>
        <Switch>
          <Route exact path="/hem">
            <Home />
          </Route>
          <Route exact path="/om-oss">
            <AboutUs />
          </Route>
          <Route exact path="/">
            <Redirect to="/" />
          </Route>
          <Route path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
      </ScrollToTop>
    </>
  );
}

export default UserRoutes;
