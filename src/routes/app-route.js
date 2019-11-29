import React from "react";
import { Route } from "react-router-dom";

// Component for alter between layouts
const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
);

export default AppRoute;
