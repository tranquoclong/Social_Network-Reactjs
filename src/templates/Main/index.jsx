import React from "react";
import Sidebar from "../../core/Sidebar";
import Menu from "../../core/Menu";
import { isAuthenticated } from "../../auth";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

function MainTemplate(props) {
  return (
    <div id="wrapper">
      <Sidebar />
      <div className="main_content">
        <Menu />
        {props.children}
      </div>
    </div>
  );
}

const RouterMainTemplate = ({ path, exact, Component }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        isAuthenticated() ? (
          <MainTemplate>
            <Component {...props} />
          </MainTemplate>
        ) : (
          <Redirect
            to={{
              pathname: "/signIn",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default RouterMainTemplate;
