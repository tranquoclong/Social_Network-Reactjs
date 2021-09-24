import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { create } from "./apiPost";
import { Link, Redirect } from "react-router-dom";

class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
      photo: "",
      error: "",
      user: {},
      fileSize: 0,
      loading: false,
      redirectToProfile: false,
    };
  }

  componentDidMount() {
    this.postData = new FormData();
    this.setState({ user: isAuthenticated().user });
  }

  isValid = () => {
    const { title, body, fileSize } = this.state;
    if (fileSize > 100000) {
      this.setState({
        error: "File size should be less than 100kb",
        loading: false,
      });
      return false;
    }
    if (title.length === 0 || body.length === 0) {
      this.setState({ error: "All fields are required", loading: false });
      return false;
    }
    return true;
  };

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.postData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;

      create(userId, token, this.postData).then((data) => {
        if (data.error) this.setState({ error: data.error });
        else {
          this.setState({
            loading: false,
            title: "",
            body: "",
            redirectToProfile: true,
          });
        }
      });
    }
  };

  newPostForm = (title, body) => (
    <>
      <div className="grid lg:grid-cols-3 mt-12 gap-8">
        <div>
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
                type="text"
                placeholder="Your name.."
                className="shadow-none bg-gray-100"
                onChange={this.handleChange("title")}
                value={title}
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="about">Content Post</label>
              <textarea
                id="body"
                name="body"
                rows={3}
                className="shadow-none bg-gray-100"
                defaultValue={""}
                onChange={this.handleChange("body")}
                value={body}
              />
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
              Create Post
            </button>
          </div>
        </div>
      </div>
    </>
  );

  render() {
    const { title, body, user, error, loading, redirectToProfile } = this.state;
    if (redirectToProfile) {
      return <Redirect to={`/user/${user._id}`} />;
    }
    return (
      <div className="container m-auto">
        <h1 className="text-2xl leading-none text-gray-900 tracking-tight mt-3">
          Create A New Post
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
        <>{this.newPostForm(title, body)}</>
      </div>
    );
  }
}

export default NewPost;
