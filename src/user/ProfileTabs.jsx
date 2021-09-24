import React, { Component } from "react";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.png";

class ProfileTabs extends Component {
  render() {
    const { following, followers, posts } = this.props;
    return (
      <div className="divide-gray-300 divide-transparent divide-x grid grid-cols-3 lg:text-left lg:text-lg mt-3 text-center w-full dark:text-gray-100">
        <div className="flex lg:flex-row flex-col">
          <Link to="#">
            {posts.length} <strong className="lg:pl-2">Posts</strong>
          </Link>
          <div
            className="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base dark:bg-gray-900 uk-drop"
            uk-drop="mode: click"
          >
            {posts.map((post, i) => (
              <ul className="space-y-1" key={i}>
                <li>
                  <Link
                    to={`/post/${post._id}`}
                    className="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-700"
                  >
                    <p className="lead">{post.title}</p>
                  </Link>
                </li>
              </ul>
            ))}
          </div>
        </div>
        <div className="lg:pl-4 flex lg:flex-row flex-col">
          <Link to="#">
            {followers.length} <strong className="lg:pl-2">Followers</strong>
          </Link>
          <div
            className="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base dark:bg-gray-900 uk-drop"
            uk-drop="mode: click"
          >
            {followers.map((person, i) => (
              <ul className="space-y-1" key={i}>
                <li>
                  <Link
                    to={`/user/${person._id}`}
                    className="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-700"
                  >
                    <img
                      style={{
                        borderRadius: "50%",
                        border: "1px solid black",
                      }}
                      className="float-left mr-2"
                      height="30px"
                      width="30px"
                      onError={(i) => (i.target.src = `${DefaultProfile}`)}
                      src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                      alt={person.name}
                    />
                    <div>
                      <p className="lead">{person.name}</p>
                    </div>
                  </Link>
                </li>
              </ul>
            ))}
          </div>
        </div>
        <div className="lg:pl-4 flex lg:flex-row flex-col">
          <Link to="#">
            {following.length} <strong className="lg:pl-2">Following</strong>
          </Link>
          <div
            className="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base dark:bg-gray-900 uk-drop"
            uk-drop="mode: click"
          >
            {following.map((person, i) => (
              <ul className="space-y-1" key={i}>
                <li>
                  <Link
                    to={`/user/${person._id}`}
                    className="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-700"
                  >
                    <img
                      style={{
                        borderRadius: "50%",
                        border: "1px solid black",
                      }}
                      className="float-left mr-2"
                      height="30px"
                      width="30px"
                      onError={(i) => (i.target.src = `${DefaultProfile}`)}
                      src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                      alt={person.name}
                    />
                    <div>
                      <p className="lead">{person.name}</p>
                    </div>
                  </Link>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileTabs;
