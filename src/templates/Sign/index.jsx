import React from "react";
import { Route } from "react-router-dom";
import FooterSign from "../../page/sign/FooterSign";
import HeaderSign from "../../page/sign/HeaderSign";

function SignTemplate(props) {
  return (
    <div id="wrapper" className="flex flex-col justify-between h-screen">
      <HeaderSign />
      <main>{props.children}</main>
      <FooterSign />
    </div>
  );
}

const RouterSignTemplate = ({ path, exact, Component }) => {
  return (
    <Route path={path} exact={exact}>
      <SignTemplate>
        <Component />
      </SignTemplate>
    </Route>
  );
};

export default RouterSignTemplate;
