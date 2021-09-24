import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

const HeaderSign = ({ history }) => (
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
  //       <Link
  //         to={`/post/create`}
  //         style={isActive(history, `/post/create`)}
  //         className="nav-link"
  //       >
  //         Create Post
  //       </Link>
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
  <div className="bg-white py-4 shadow dark:bg-gray-800">
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center lg:justify-between justify-around">
        <Link
          to="/"
          className="bg-gradient-to-bl font-semibold from-pink-400 px-6 py-3 rounded text-sm text-white to-pink-600"
        >
          DRAGONCUTE
        </Link>
        <div className="capitalize flex font-semibold hidden lg:block my-2 space-x-3 text-center text-sm">
          <Link to="/SignIn" className="py-3 px-4">
            Login
          </Link>
          <Link
            to="/SignUp"
            className="bg-pink-500 pink-500 px-6 py-3 rounded-md shadow text-white"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default withRouter(HeaderSign);
