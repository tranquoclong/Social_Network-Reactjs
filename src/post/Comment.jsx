import React, { Component } from "react";
import { comment, uncomment } from "./apiPost";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.png";

class Comment extends Component {
  state = {
    text: "",
    error: "",
  };

  handleChange = (event) => {
    this.setState({ error: "" });
    this.setState({ text: event.target.value });
  };

  isValid = () => {
    const { text } = this.state;
    if (!text.length > 0 || text.length > 150) {
      this.setState({
        error: "Comment should not be empty and less than 150 characters long",
      });
      return false;
    }
    return true;
  };

  addComment = (e) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      this.setState({ error: "Please signin to leave a comment" });
      return false;
    }
    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;
      const postId = this.props.postId;
      comment(userId, token, postId, { text: this.state.text }).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          this.setState({ text: "" });
          this.props.updateComments(data.comments);
        }
      });
    }
  };

  deleteComment = (comment) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    const postId = this.props.postId;
    uncomment(userId, token, postId, comment).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.props.updateComments(data.comments);
      }
    });
  };

  deleteConfirmed = (comment) => {
    let answer = window.confirm(
      "Are you sure you want to delete your comment?"
    );
    if (answer) {
      this.deleteComment(comment);
    }
  };

  render() {
    const { comments } = this.props;
    const { error } = this.state;
    return (
      <div className="py-3 px-4 space-y-3">
        <h2 className="mt-5 mb-5">Leave a comment</h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        <div className="col-md-12">
          <h3 className="text-primary">{comments.length} Comments</h3>
          <hr />
          {comments.map((comment, i) => (
            <div key={i}>
              <h3 className="lg:w-60 mx-auto text-sm uk-heading-line uk-text-center lg:pt-2">
                <span> {new Date(comment.created).toDateString()} </span>
              </h3>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="flex lg:items-center">
                  <div className="w-14 h-14 rounded-full relative flex-shrink-0">
                    <Link to={`/user/${comment.postedBy._id}`}>
                      <img
                        style={{
                          borderRadius: "50%",
                          border: "1px solid black",
                        }}
                        className="absolute h-full rounded-full w-full"
                        height="30px"
                        width="30px"
                        onError={(i) => (i.target.src = `${DefaultProfile}`)}
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
                        alt={comment.postedBy.name}
                      />
                    </Link>
                  </div>
                  <div className="text-gray-700 py-2 px-3 rounded bg-gray-100 h-full relative lg:ml-5 ml-2 lg:mr-20 dark:bg-gray-700 dark:text-white">
                    <p className="font-semibold text-black text-base">
                      {comment.postedBy.name}
                    </p>
                    <p className="leading-6">{comment.text}</p>
                    <div className="absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-700" />
                  </div>
                </div>
                <p className="font-italic mark">
                  <span>
                    {isAuthenticated().user &&
                      isAuthenticated().user._id === comment.postedBy._id && (
                        <button
                          className="btn btn-raised btn-success"
                          onClick={() => this.deleteConfirmed(comment)}
                        >
                          Remove
                        </button>
                      )}
                  </span>
                </p>
              </div>
            </div>
          ))}
          <form className="flex" onSubmit={this.addComment}>
            <div
              className="bg-gray-100 bg-gray-100 rounded-full rounded-md relative dark:bg-gray-800 mt-5"
              style={{ width: "-webkit-fill-available" }}
            >
              <input
                type="text"
                onChange={this.handleChange}
                value={this.state.text}
                placeholder="Add your Comment.."
                className="bg-transparent max-h-10 shadow-none"
              />
              <div className="absolute bottom-0 flex h-full items-center right-0 right-3 text-xl space-x-2">
                <Link href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="16"
                    fill="currentColor"
                    class="bi bi-card-image"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                  </svg>
                </Link>
                <Link href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="16"
                    fill="currentColor"
                    class="bi bi-camera-video"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <button
              type="submit"
              class="bg-blue-600 font-semibold px-6 py-2 rounded-md text-white mt-5 ml-2"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Comment;
