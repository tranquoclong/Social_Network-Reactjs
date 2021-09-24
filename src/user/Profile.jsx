import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect, Link } from "react-router-dom";
import { read } from "./apiUser";
import DefaultProfile from "../images/avatar.png";
import DeleteUser from "./DeleteUser";
import FollowProfileButton from "./FollowProfileButton";
import ProfileTabs from "./ProfileTabs";
import { listByUser } from "../post/apiPost";
import PostByUser from "./PostByUser";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: { following: [], followers: [] },
      redirectToSignin: false,
      following: false,
      error: "",
      posts: [],
    };
  }

  checkFollow = (user) => {
    const jwt = isAuthenticated();
    const match = user.followers.find((follower) => {
      return follower._id === jwt.user._id;
    });
    return match;
  };

  clickFollowButton = (callApi) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    callApi(userId, token, this.state.user._id).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ user: data, following: !this.state.following });
      }
    });
  };

  init = (userId) => {
    const token = isAuthenticated().token;
    read(userId, token).then((data) => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.setState({ user: data });
        let following = this.checkFollow(data);
        this.setState({ user: data, following });
        this.loadPosts(data._id);
      }
    });
  };

  loadPosts = (userId) => {
    const token = isAuthenticated().token;
    listByUser(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }

  render() {
    const { redirectToSignin, user, posts } = this.state;
    if (redirectToSignin) return <Redirect to="/signIn" />;
    const photoUrl = user._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${
          user._id
        }?${new Date().getTime()}`
      : DefaultProfile;
    return (
      <div className="container pro-container m-auto">
        <div className="flex lg:flex-row flex-col items-center lg:py-8 lg:space-x-8">
          <div>
            <div className="bg-gradient-to-tr from-yellow-600 to-pink-600 p-1 rounded-full m-0.5 mr-2  w-56 h-56 relative overflow-hidden uk-transition-toggle">
              <img
                src={photoUrl}
                onError={(i) => (i.target.src = `${DefaultProfile}`)}
                alt={user.name}
                className="bg-gray-200 border-4 border-white rounded-full w-full h-full dark:border-gray-900"
              />
              <div className="absolute -bottom-3 custom-overly1 flex justify-center pt-4 pb-7 space-x-3 text-2xl text-white uk-transition-slide-bottom-medium w-full">
                <Link href="#" className="hover:text-white">
                  <i className="uil-camera" />
                </Link>
                <Link href="#" className="hover:text-white">
                  <i className="uil-crop-alt" />
                </Link>
              </div>
            </div>
          </div>
          <div className="lg:w/8/12 flex-1 flex flex-col lg:items-start items-center">
            <h2 className="font-semibold lg:text-2xl text-lg mb-2">
              {user.name}
            </h2>
            <p className="lg:text-left mb-2 text-center  dark:text-gray-100">
              {user.about}
            </p>
            <p className="lg:text-left mb-2 text-center  dark:text-gray-100">{`Joined ${new Date(
              user.created
            ).toDateString()}`}</p>
            <div className="flex font-semibold mb-3 space-x-2  dark:text-gray-10">
              <Link href="#">Travailing</Link> , <Link href="#">Sports</Link> ,
              <Link href="#">Movies</Link>
            </div>
            <div className="capitalize flex font-semibold space-x-3 text-center text-sm my-2">
              {isAuthenticated().user &&
              isAuthenticated().user._id === user._id ? (
                <>
                  <Link
                    className="bg-gray-300 shadow-sm p-2 px-6 rounded-md dark:bg-gray-700"
                    to={`/post/create`}
                  >
                    Create Post
                  </Link>
                  <Link
                    className="bg-pink-500 shadow-sm p-2 pink-500 px-6 rounded-md text-white hover:text-white hover:bg-pink-600"
                    to={`/user/edit/${user._id}`}
                  >
                    Edit Profile
                  </Link>
                  <DeleteUser userId={user._id} />
                </>
              ) : (
                <FollowProfileButton
                  following={this.state.following}
                  onButtonClick={this.clickFollowButton}
                />
              )}
              {isAuthenticated().user &&
                isAuthenticated().user.role === "admin" && (
                  <div class="card mt-5">
                    <div className="card-body">
                      <h5 className="card-title">Admin</h5>
                      <p className="mb-2 text-danger">
                        Edit/Delete as an Admin
                      </p>
                      <Link
                        className="btn btn-raised btn-success mr-5"
                        to={`/user/edit/${user._id}`}
                      >
                        Edit Profile
                      </Link>
                      <DeleteUser userId={user._id} />
                      <DeleteUser />
                    </div>
                  </div>
                )}
              <div>
                <Link
                  href="#"
                  className="bg-gray-300 flex h-12 h-full items-center justify-center rounded-full text-xl w-9 dark:bg-gray-700"
                  aria-expanded="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-caret-down-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </Link>
                <div
                  className="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base dark:bg-gray-900 uk-drop"
                  uk-drop="mode: click"
                >
                  <ul className="space-y-1">
                    <li>
                      <Link
                        href="#"
                        className="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-700"
                      >
                        <i className="uil-user-minus mr-2" />
                        Unfriend
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-700"
                      >
                        <i className="uil-eye-slash  mr-2" />
                        Hide Your Story
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-700"
                      >
                        <i className="uil-share-alt mr-2" /> Share This Profile
                      </Link>
                    </li>
                    <li>
                      <hr className="-mx-2 my-2  dark:border-gray-700" />
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600"
                      >
                        <i className="uil-stop-circle mr-2" /> Block
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <ProfileTabs
              followers={user.followers}
              following={user.following}
              posts={posts}
            />
          </div>
          <div className="w-20" />
        </div>
        <PostByUser posts={posts} />
      </div>
    );
  }
}

export default Profile;
