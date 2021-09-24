import React, { Component } from "react";
import DefaultPost from "../images/defaultPost.png";
import { list } from "./apiPost";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.png";
class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      page: 1,
    };
  }

  loadPosts = (page) => {
    list(page).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          posts: data,
        });
      }
    });
  };

  componentDidMount() {
    this.loadPosts(this.state.page);
  }

  loadMore = (number) => {
    this.setState({ page: this.state.page + number });
    this.loadPosts(this.state.page + number);
  };

  loadLess = (number) => {
    this.setState({ page: this.state.page - number });
    this.loadPosts(this.state.page - number);
  };

  renderPosts = (posts) => {
    return (
      <>
        {posts.reverse().map((post, i) => {
          const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
          const photoUrl = post.postedBy
            ? `${process.env.REACT_APP_API_URL}/user/photo/${
                post.postedBy._id
              }?${new Date().getTime()}`
            : DefaultProfile;
          const posterName = post.postedBy ? post.postedBy.name : " Unknown";
          return (
            <div
              className="bg-white shadow rounded-md dark:bg-gray-900 -mx-2 lg:mx-0"
              key={i}
            >
              <div className="flex justify-between items-center px-4 py-3">
                <div className="flex flex-1 items-center space-x-4">
                  <Link to={`${posterId}`}>
                    <div className="bg-gradient-to-tr from-yellow-600 to-pink-600 p-0.5 rounded-full">
                      <img
                        src={photoUrl}
                        alt="avatar"
                        className="bg-gray-200 border border-white rounded-full w-8 h-8"
                      />
                    </div>
                  </Link>
                  <span className="block capitalize font-semibold dark:text-gray-100">
                    <Link to={`${posterId}`}>{posterName} </Link> on{" "}
                    {new Date(post.created).toDateString()}
                  </span>
                </div>
              </div>
              <div>
                <h5 className="px-4">{post.title}</h5>
                <p className="px-4">{post.body.substring(0, 100)}</p>
                <Link to={`/post/${post._id}`}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                    alt={post.title}
                    onError={(i) => (i.target.src = `${DefaultPost}`)}
                  />
                </Link>
              </div>
              <div className="py-3 px-4 space-y-3">
                <div className="flex space-x-4 lg:font-bold">
                  <Link
                    to={`/post/${post._id}`}
                    className="flex items-center space-x-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      width={22}
                      height={22}
                      className="dark:text-gray-100"
                    >
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>

                    <div>{post.likes.length} Like</div>
                  </Link>
                  <Link
                    to={`/post/${post._id}`}
                    className="flex items-center space-x-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      width={22}
                      height={22}
                      className="dark:text-gray-100"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <div> Comment</div>
                  </Link>
                  <Link
                    to={`/post/${post._id}`}
                    className="flex items-center space-x-2 flex-1 justify-end"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      width={22}
                      height={22}
                      className="dark:text-gray-100"
                    >
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                    <div> Share</div>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  render() {
    const { posts, page } = this.state;
    return (
      <div className="space-y-5 flex-shrink-0 lg:w-7/12">
        {this.renderPosts(posts)}
        {page > 1 ? (
          <button
            className="btn btn-raised btn-warning mr-5 mt-5 mb-5"
            onClick={() => this.loadLess(1)}
          >
            Previous ({this.state.page - 1})
          </button>
        ) : (
          ""
        )}

        {posts.length ? (
          <button
            className="btn btn-raised btn-success mt-5 mb-5"
            onClick={() => this.loadMore(1)}
          >
            Next ({page + 1})
          </button>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Posts;

// <div className="row">
//   {posts.map((post, i) => {
//     const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
//     const posterName = post.postedBy ? post.postedBy.name : " Unknown";

//     return (
//       <div className="card col-md-4" key={i}>
//         <div className="card-body">

//           <h5 className="card-title">{post.title}</h5>
//           <p className="card-text">{post.body.substring(0, 100)}</p>
//           <br />
//           <p className="font-italic mark">
//             Posted by <Link to={`${posterId}`}>{posterName} </Link>
//             on {new Date(post.created).toDateString()}
//           </p>

//         </div>
//       </div>
//     );
//   })}
// </div>
