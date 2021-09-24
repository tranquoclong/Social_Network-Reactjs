import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { read, update, updateUser } from "./apiUser";
import { Link, Redirect } from "react-router-dom";
import DefaultProfile from "../images/avatar.png";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      email: "",
      password: "",
      redirectToProfile: false,
      error: "",
      fileSize: 0,
      loading: false,
      about: "",
    };
  }

  init = (userId) => {
    const token = isAuthenticated().token;
    read(userId, token).then((data) => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email,
          error: "",
          about: data.about,
        });
      }
    });
  };

  componentDidMount() {
    this.userData = new FormData();
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  isValid = () => {
    const { name, email, password, fileSize } = this.state;
    if (fileSize > 1000000) {
      this.setState({
        error: "File size should be less than 100kb",
        loading: false,
      });
      return false;
    }
    if (name.length === 0) {
      this.setState({ error: "Name is required", loading: false });
      return false;
    }
    // eslint-disable-next-line
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({
        error: "A valid Email is required",
        loading: false,
      });
      return false;
    }
    if (password.length >= 1 && password.length <= 5) {
      this.setState({
        error: "Password must be at least 6 characters long",
        loading: false,
      });
      return false;
    }
    return true;
  };

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.userData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    if (this.isValid()) {
      const userId = this.props.match.params.userId;
      const token = isAuthenticated().token;
      update(userId, token, this.userData).then((data) => {
        if (data.error) {
          this.setState({ error: data.error });
        } else if (isAuthenticated().user.role === "admin") {
          this.setState({
            redirectToProfile: true,
          });
        } else {
          updateUser(data, () => {
            this.setState({
              redirectToProfile: true,
            });
          });
        }
      });
    }
  };

  signUpForm(id, name, email, password, about) {
    const photoUrl = id
      ? `${
          process.env.REACT_APP_API_URL
        }/user/photo/${id}?${new Date().getTime()}`
      : DefaultProfile;
    return (
      <>
        <ul className="mt-5 -mr-3 flex-nowrap lg:overflow-hidden overflow-x-scroll uk-tab">
          <li className="uk-active">
            <Link href="#">General</Link>
          </li>
          <li>
            <Link href="#">Profile</Link>
          </li>
          <li>
            <Link href="#">Privacy</Link>
          </li>
          <li>
            <Link href="#">Notification</Link>
          </li>
          <li>
            <Link href="#">Social links</Link>
          </li>
          <li>
            <Link href="#">Billing</Link>
          </li>
          <li>
            <Link href="#">Security</Link>
          </li>
        </ul>
        <div className="grid lg:grid-cols-3 mt-12 gap-8">
          <div>
            <img
              style={{ height: "200px", width: "auto" }}
              className="img-thumbnail rounded-lg mb-5"
              src={photoUrl}
              onError={(i) => (i.target.src = `${DefaultProfile}`)}
              alt={name}
            />
            <div className="px-4 py-3 -mx-5 -mt-4 mb-5 border-b">
              <h4>Profile Photo</h4>
            </div>
            <div className="flex justify-center flex-center text-center dark:text-gray-300">
              <div className="flex flex-col choose-upload text-center">
                <div className="bg-gray-400 border-2 border-dashed flex flex-col h-24 items-center justify-center relative w-full rounded-lg dark:bg-gray-800 dark:border-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-12"
                  >
                    <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                    <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                  </svg>
                </div>
                <p className="my-3 leading-6">
                  Do you have a photo wants to share us <br /> please upload her
                  ..
                </p>
                <div uk-form-custom className="uk-form-custom">
                  <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept="image/*"
                    className="shadow-none bg-gray-100"
                  />
                  <Link to="#" className="button soft-warning small">
                    Choose file
                  </Link>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 -mx-5 -mb-4 mt-5 border-t text-sm dark:border-gray-500 dark:text-gray-500">
              Your Photo size Must be Maxmium 999MB
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-md lg:shadow-lg shadow col-span-2">
            <div className="grid grid-cols-2 gap-3 lg:p-6 p-4">
              <div>
                <label htmlFor> First name</label>
                <input
                  onChange={this.handleChange("name")}
                  type="text"
                  value={name}
                  placeholder="Your name.."
                  className="shadow-none bg-gray-100"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor> Email</label>
                <input
                  type="text"
                  placeholder="Your name.."
                  className="shadow-none bg-gray-100"
                  onChange={this.handleChange("email")}
                  value={email}
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="about">About me</label>
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="shadow-none bg-gray-100"
                  defaultValue={""}
                  onChange={this.handleChange("about")}
                  value={about}
                />
              </div>
              <div className="col-span-2">
                <label htmlFor> Password</label>
                <input
                  onChange={this.handleChange("password")}
                  type="password"
                  value={password}
                  placeholder
                  className="shadow-none bg-gray-100"
                />
              </div>
              <div>
                <label htmlFor> Working at</label>
                <input
                  type="text"
                  placeholder
                  className="shadow-none bg-gray-100"
                />
              </div>
              <div>
                <label htmlFor> Relationship </label>
                <select
                  id="relationship"
                  name="relationship"
                  className="shadow-none bg-gray-100"
                >
                  <option value={0}>None</option>
                  <option value={1}>Single</option>
                  <option value={2}>In a relationship</option>
                  <option value={3}>Married</option>
                  <option value={4}>Engaged</option>
                </select>
              </div>
            </div>
            <div className="bg-gray-10 p-6 pt-0 flex justify-end space-x-3">
              <Link to="#" className="p-2 px-4 rounded bg-gray-50 text-red-500">
                Cancel
              </Link>
              <button
                onClick={this.clickSubmit}
                type="button"
                className="button bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-xl mb-2"> Privacy</h3>
            <p> Lorem ipsum dolor sit amet nibh consectetuer adipiscing elit</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-md lg:shadow-lg shadow lg:p-6 p-4 col-span-2">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <h4> Who can follow me ?</h4>
                  <div>
                    {" "}
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,{" "}
                  </div>
                </div>
                <div className="switches-list -mt-8 is-large">
                  <div className="switch-container">
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="switch-button" />{" "}
                    </label>
                  </div>
                </div>
              </div>
              <hr />
              <div className="flex justify-between items-center">
                <div>
                  <h4> Show my activities ?</h4>
                  <div>
                    {" "}
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,{" "}
                  </div>
                </div>
                <div className="switches-list -mt-8 is-large">
                  <div className="switch-container">
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="switch-button" />{" "}
                    </label>
                  </div>
                </div>
              </div>
              <hr />
              <div className="flex justify-between items-center">
                <div>
                  <h4> Search engines?</h4>
                  <div>
                    {" "}
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,{" "}
                  </div>
                </div>
                <div className="switches-list -mt-8 is-large">
                  <div className="switch-container">
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="switch-button" />{" "}
                    </label>
                  </div>
                </div>
              </div>
              <hr />
              <div className="flex justify-between items-center">
                <div>
                  <h4> Allow Commenting?</h4>
                  <div>
                    {" "}
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,{" "}
                  </div>
                </div>
                <div className="switches-list -mt-8 is-large">
                  <div className="switch-container">
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="switch-button" />{" "}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  render() {
    const {
      id,
      name,
      email,
      password,
      redirectToProfile,
      error,
      loading,
      about,
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }

    return (
      <div className="container m-auto">
        <h1 className="text-2xl leading-none text-gray-900 tracking-tight mt-3">
          Account Setting
        </h1>
        <div
          className="alert alert-danger"
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
        <>
          {isAuthenticated().user.role === "admin" &&
            this.signUpForm(id, name, email, password, about)}

          {isAuthenticated().user._id === id &&
            this.signUpForm(id, name, email, password, about)}
        </>
      </div>
    );
  }
}

export default EditProfile;
