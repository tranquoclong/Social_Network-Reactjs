import React from "react";
import { withRouter } from "react-router-dom";
import { signOut, isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.png";

const photoUrl = () => {
  if (`${isAuthenticated().user._id}`) {
    return `${process.env.REACT_APP_API_URL}/user/photo/${`${
      isAuthenticated().user._id
    }`}?${new Date().getTime()}`;
  } else {
    return DefaultProfile;
  }
};

const Menu = ({ history }) => (
  // <div>
  //   <ul className="nav nav-tabs bg-primary">
  //     <li className="nav-item">
  //       <Link className="nav-link" style={isActive(history, "/")} to="/">
  //         Home
  //       </Link>
  //     </li>

  //     <li>
  //       <Link to={`/users`} style={isActive(history, `/users`)}>
  //         Users
  //       </Link>
  //     </li>
  //     <li className="nav-item">
  // <Link
  //   to={`/post/create`}
  //   style={isActive(history, `/post/create`)}
  //   className="nav-link"
  // >
  //   Create Post
  // </Link>
  //     </li>

  //     {!isAuthenticated() && (
  //       <React.Fragment>
  //         <li className="nav-item">
  //           <Link
  //             className="nav-link"
  //             style={isActive(history, "/signIn")}
  //             to="/signIn"
  //           >
  //             Sign In
  //           </Link>
  //         </li>
  //         <li className="nav-item">
  //           <Link
  //             className="nav-link"
  //             style={isActive(history, "/signUp")}
  //             to="/signUp"
  //           >
  //             Sign Up
  //           </Link>
  //         </li>
  //       </React.Fragment>
  //     )}

  //     {isAuthenticated() && isAuthenticated().user.role === "admin" && (
  //       <li className="nav-item">
  //         <Link
  //           to={`/admin`}
  //           style={isActive(history, `/admin`)}
  //           className="nav-link"
  //         >
  //           Admin
  //         </Link>
  //       </li>
  //     )}

  //     {isAuthenticated() && (
  //       <React.Fragment>
  //         <li className="nav-item">
  //           <Link
  //             to={`/findpeople`}
  //             style={isActive(history, `/findpeople`)}
  //             className="nav-link"
  //           >
  //             Find People
  //           </Link>
  //         </li>

  //         <li className="nav-item">
  //           <Link
  //             to={`/user/${isAuthenticated().user._id}`}
  //             style={isActive(history, `/user/${isAuthenticated().user._id}`)}
  //             className="nav-link"
  //           >
  //             {`${isAuthenticated().user.name}'s profile`}
  //           </Link>
  //         </li>

  //         <li className="nav-item">
  //           <span
  //             className="nav-link"
  //             style={{ cursor: "pointer", color: "#fff" }}
  //             onClick={() => signOut(() => history.push("/"))}
  //           >
  //             Sign Out
  //           </span>
  //         </li>
  //       </React.Fragment>
  //     )}
  //   </ul>
  // </div>
  <header>
    <div className="header_inner">
      <div className="left-side">
        {/* Logo */}
        <div id="logo" className=" uk-hidden@s">
          long
        </div>
        <div
          className="triger"
          uk-toggle="target: #wrapper ; cls: sidebar-active"
        >
          <i className="uil-bars" />
        </div>
        <div className="header_search">
          <input type="text" placeholder="Search.." />
          <div className="icon-search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="right-side lg:pr-4">
        <Link
          to={`/post/create`}
          className="bg-pink-500 font-bold hover:bg-pink-600 hover:text-white lg:block max-h-10 mr-4 px-4 py-2 rounded text-white"
        >
          <ion-icon
            name="add-circle"
            class="-mb-1 mr-1 opacity-90 text-xl uilus-circle"
          ></ion-icon>{" "}
          Upload
        </Link>
        <a href="/" class="header-links-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </a>
        <div uk-drop="mode: click;offset: 4" class="header_dropdown">
          <h4 class="-mt-5 -mx-5 bg-gradient-to-t from-gray-100 to-gray-50 border-b font-bold px-6 py-3">
            Notification{" "}
          </h4>
        </div>
        {/* Messages */}
        <a href="/" className="header-links-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
        </a>
        <div uk-drop="mode: click;offset: 4" className="header_dropdown">
          <h4 className="-mt-5 -mx-5 bg-gradient-to-t from-gray-100 to-gray-50 border-b font-bold px-6 py-3">
            Messages
          </h4>
        </div>
        <div>
          <Link href="#">
            <img src={photoUrl()} className="header-avatar" alt="avatar" />
          </Link>
          <div
            uk-drop="mode: click;offset:9"
            className="header_dropdown profile_dropdown border-t"
          >
            <ul>
              <li>
                <Link href="#"> Account setting </Link>
              </li>
              <li>
                <Link href="#"> Payments </Link>
              </li>
              <li>
                <Link href="#"> Help </Link>
              </li>
              <li>
                <Link href="#" onClick={() => signOut(() => history.push("/"))}>
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default withRouter(Menu);
