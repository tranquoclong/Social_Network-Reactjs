import React from "react";
import { Route } from "react-router-dom";

function ErrTemplate(props) {
  return <main>{props.children}</main>;
}

const RouterErrTemplate = ({ Component }) => {
  return (
    <Route>
      <ErrTemplate>
        <Component />
      </ErrTemplate>
    </Route>
  );
};

export default RouterErrTemplate;
