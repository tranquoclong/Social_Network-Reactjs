import React, { Component } from "react";
import { signUp } from "../../auth";
import { Link } from "react-router-dom";

class ContentSignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      open: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password,
    };
    signUp(user).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else
        this.setState({
          error: "",
          name: "",
          email: "",
          password: "",
          open: true,
        });
    });
  };

  signUpForm = (name, email, password) => (
    <form action>
      <input
        onChange={this.handleChange("name")}
        type="text"
        value={name}
        placeholder="First Name"
        className="bg-gray-200 mb-2 shadow-none  dark:bg-gray-800"
        style={{ border: "1px solid #d3d5d8 !important" }}
      />
      <input
        onChange={this.handleChange("email")}
        type="email"
        value={email}
        placeholder="Email"
        className="bg-gray-200 mb-2 shadow-none  dark:bg-gray-800"
        style={{ border: "1px solid #d3d5d8 !important" }}
      />
      <input
        onChange={this.handleChange("password")}
        type="password"
        value={password}
        placeholder="Password"
        className="bg-gray-200 mb-2 shadow-none  dark:bg-gray-800"
        style={{ border: "1px solid #d3d5d8 !important" }}
      />
      <input
        type="text"
        placeholder="Confirm Password"
        className="bg-gray-200 mb-2 shadow-none  dark:bg-gray-800"
        style={{ border: "1px solid #d3d5d8 !important" }}
      />
      <div className="flex justify-start my-4 space-x-1">
        <div className="checkbox">
          <input type="checkbox" id="chekcbox1" defaultChecked />
          <label htmlFor="chekcbox1">
            <span className="checkbox-icon" /> I Agree
          </label>
        </div>
        <Link to="#"> Terms and Conditions</Link>
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
          Do you have an account? <Link to="/signIn"> Login </Link>
        </p>
      </div>
    </form>
  );

  render() {
    const { name, email, password, error, open } = this.state;
    return (
      <div>
        <div className="lg:p-12 max-w-md max-w-xl lg:my-0 my-12 mx-auto p-6 space-y-">
          <div
            className="items-center leading-8 space-x-2 text-red-500 font-medium"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
          <div className="flex" style={{ display: open ? "" : "none" }}>
            New account is successfully created. Please
            <Link
              to="/signIn"
              className="hover:text-red-400 space-x-2 pl-3 text-red-500 font-medium"
            >
              Sign In
            </Link>
          </div>
          <h1 className="lg:text-3xl text-xl font-semibold mb-6"> Sign in</h1>
          <p className="mb-2 text-black text-lg">
            Register to manage your account
          </p>
          {this.signUpForm(name, email, password)}
        </div>
      </div>
    );
  }
}

export default ContentSignUp;
