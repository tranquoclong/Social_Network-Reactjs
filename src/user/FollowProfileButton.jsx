import React, { Component } from "react";
import { follow, unFollow } from "./apiUser";

class FollowProfileButton extends Component {
  followClick = () => {
    this.props.onButtonClick(follow);
  };

  unFollowClick = () => {
    this.props.onButtonClick(unFollow);
  };

  render() {
    return (
      <div className="d-inline-block">
        {!this.props.following ? (
          <button
            onClick={this.followClick}
            className="bg-pink-500 shadow-sm p-2 pink-500 px-6 rounded-md text-white hover:text-white hover:bg-pink-600"
          >
            Follow
          </button>
        ) : (
          <button
            onClick={this.unFollowClick}
            className="bg-gray-300 shadow-sm p-2 px-6 rounded-md dark:bg-gray-700"
          >
            UnFollow
          </button>
        )}
      </div>
    );
  }
}

export default FollowProfileButton;
