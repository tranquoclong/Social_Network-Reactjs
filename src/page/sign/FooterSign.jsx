import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

const FooterSign = () => (
  <div className="lg:mb-5 py-3 uk-link-reset">
    <div className="flex flex-col items-center justify-between lg:flex-row max-w-6xl mx-auto lg:space-y-0 space-y-3">
      <div className="flex space-x-2 text-gray-700 uppercase">
        <Link to="#"> About</Link>
        <Link to="#"> Help</Link>
        <Link to="#"> Terms</Link>
        <Link to="#"> Privacy</Link>
      </div>
      <p className="capitalize"> © copyright 2021 by DRAGONCUTE</p>
    </div>
  </div>
);

export default withRouter(FooterSign);
