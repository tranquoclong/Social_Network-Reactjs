import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { signIn, authenticate } from "../../auth";

class ContentSignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToReferer: false,
      loading: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };
    signIn(user).then((data) => {
      if (data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          this.setState({ redirectToReferer: true });
        });
      }
    });
  };

  signInForm = (email, password) => (
    <form action>
      <input
        onChange={this.handleChange("email")}
        type="email"
        value={email}
        placeholder="example@mydomain.com"
        className="bg-gray-200 mb-2 shadow-none dark:bg-gray-800"
        style={{ border: "1px solid #d3d5d8 !important" }}
      />
      <input
        onChange={this.handleChange("password")}
        type="password"
        value={password}
        placeholder="***********"
        className="bg-gray-200 mb-2 shadow-none dark:bg-gray-800"
        style={{ border: "1px solid #d3d5d8 !important" }}
      />
      <div className="flex justify-between my-4">
        <div className="checkbox">
          <input type="checkbox" id="chekcbox1" defaultChecked />
          <label htmlFor="chekcbox1">
            <span className="checkbox-icon" />
            Remember Me
          </label>
        </div>
        <Link to="/forgot-password">Forgot Your Password?</Link>
      </div>
      <button
        onClick={this.clickSubmit}
        type="submit"
        className="bg-gradient-to-br from-pink-500 py-3 rounded-md text-white text-xl to-red-400 w-full"
      >
        Login
      </button>
      <div className="text-center mt-5 space-x-2">
        <p className="text-base">
          Not registered?
          <Link to="/SignUp">Create a account</Link>
        </p>
      </div>
    </form>
  );

  render() {
    const { email, password, error, redirectToReferer, loading } = this.state;
    if (redirectToReferer) {
      return <Redirect to="/" />;
    }
    return (
      <div className="lg:p-12 max-w-md max-w-xl lg:my-0 my-12 mx-auto p-6 space-y-">
        <div
          className="items-center leading-8 space-x-2 text-red-500 font-medium"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        {loading ? (
          <div className="loadingio-spinner-rolling-l694aggo5r8">
            <div className="ldio-2jzvx09mle4">
              <div />
            </div>
          </div>
        ) : (
          ""
        )}
        <h1 className="lg:text-3xl text-xl font-semibold  mb-6"> Log in</h1>
        <p className="mb-2 text-black text-lg"> Email or Username</p>
        {this.signInForm(email, password)}
      </div>
    );
  }
}

export default ContentSignIn;
