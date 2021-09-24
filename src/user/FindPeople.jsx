import React, { Component } from "react";
import { findPeople, follow } from "./apiUser";
import DefaultProfile from "../images/avatar.png";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";

class FindPeople extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      error: "",
      following: false,
    };
  }

  componentDidMount() {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    findPeople(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data });
      }
    });
  }

  clickFollow = (user, i) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    follow(userId, token, user._id).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        let toFollow = this.state.users;
        toFollow.splice(i, 1);
        this.setState({
          users: toFollow,
          open: true,
          followMessage: `Following ${user.name}`,
        });
      }
    });
  };

  renderUsers = (users) => (
    <div className="divide-gray-300 divide-gray-50 divide-opacity-50 divide-y px-4 dark:divide-gray-800 dark:text-gray-100">
      {users.map((user, i) => (
        <div className="flex items-center justify-between py-3" key={i}>
          <div className="flex flex-1 items-center space-x-4">
            <Link to={`/user/${user._id}`}>
              <img
                src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                onError={(i) => (i.target.src = `${DefaultProfile}`)}
                alt={user.name}
                className="bg-gray-200 rounded-full w-10 h-10"
              />
            </Link>
            <div className="flex flex-col">
              <span className="block capitalize font-semibold">
                {user.name}
              </span>
              <span className="block capitalize text-sm">{user.email}</span>
            </div>
          </div>
          <button
            onClick={() => this.clickFollow(user, i)}
            className="border border-gray-200 font-semibold px-4 py-1 rounded-full hover:bg-pink-600 hover:text-white hover:border-pink-600 dark:border-gray-800"
          >
            Follow
          </button>
        </div>
      ))}
    </div>
  );

  render() {
    const { users, following } = this.state;
    return (
      <div className="lg:w-5/12">
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-md overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 flex items-baseline justify-between py-4 px-6 dark:border-gray-800">
            <h2 className="font-semibold text-lg">Who to follow</h2>
            <Link to="#"> Refresh</Link>
          </div>
          {this.renderUsers(users, following)}
        </div>
      </div>
    );
  }
}

export default FindPeople;
