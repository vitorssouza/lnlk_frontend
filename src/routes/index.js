import React from "react";
import { decode } from "jsonwebtoken";
import { withRouter, Switch, Redirect } from "react-router-dom";

// Layout Import;
import BaseLayout from "../components/layouts/base-layout";
import AppRoute from "./app-route";

// Components Import
import Login from "../components/pages/auth/login";
import Dashboard from "../components/pages/dashboard";

// Departments
import Departments from "../components/pages/departments/list";
import FormDepartments from "../components/pages/departments/form";

// Employees
import Employees from "../components/pages/employees/list";
import FormEmployees from "../components/pages/employees/form";

// Movements
import Movements from "../components/pages/movements/list";
import FormMovements from "../components/pages/movements/form";

// Lazy load for components
const waitFor = Tag => props => <Tag {...props} />;

// Layouts Components
const LoginLayout = props => <div>{props.children}</div>;
const MainLayout = props => <BaseLayout>{props.children}</BaseLayout>;

// Routes
const Routes = ({ location }) => {
  const systemPages = ["/", "/login"];

  const pathName = location.pathname.split("/");
  const checkPathName = `/${pathName[1]}`;

  if (systemPages.indexOf(checkPathName) > -1) {
    return (
      <Switch location={location}>
        <AppRoute
          exact
          path="/"
          layout={LoginLayout}
          component={waitFor(Login)}
        />

        <AppRoute
          path="/login"
          layout={LoginLayout}
          component={waitFor(Login)}
        />
      </Switch>
    );
  } else {
    const decodedToken = decode(localStorage.getItem("token"));
    const tokenIsValid = decodedToken
      ? new Date(decodedToken.exp * 1000) > new Date()
      : undefined;

    if (localStorage.getItem("token") && tokenIsValid) {
      return (
        <Switch location={location}>
          <AppRoute
            path="/home"
            layout={MainLayout}
            component={waitFor(Dashboard)}
            breadcrumb={["App", "teste"]}
          />

          {/* DEPARTMENTS */}
          <AppRoute
            exact
            path="/departments"
            layout={MainLayout}
            component={waitFor(Departments)}
          />

          <AppRoute
            path="/departments/create"
            layout={MainLayout}
            component={waitFor(FormDepartments)}
          />

          <AppRoute
            path="/departments/:id/edit"
            layout={MainLayout}
            component={waitFor(FormDepartments)}
          />

          {/* EMPLOYEES */}
          <AppRoute
            exact
            path="/employees"
            layout={MainLayout}
            component={waitFor(Employees)}
          />

          <AppRoute
            path="/employees/create"
            layout={MainLayout}
            component={waitFor(FormEmployees)}
          />

          <AppRoute
            path="/employees/:id/edit"
            layout={MainLayout}
            component={waitFor(FormEmployees)}
          />

          {/* MOVEMENTS */}
          <AppRoute
            exact
            path="/movements"
            layout={MainLayout}
            component={waitFor(Movements)}
          />

          <AppRoute
            path="/movements/create"
            layout={MainLayout}
            component={waitFor(FormMovements)}
          />

          <AppRoute
            path="/movements/:id/edit"
            layout={MainLayout}
            component={waitFor(FormMovements)}
          />
        </Switch>
      );
    }

    return <Redirect to="/login" />;
  }
};

export default withRouter(Routes);
