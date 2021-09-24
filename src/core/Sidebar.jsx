import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signOut, isAuthenticated } from "../auth";
import DefaultProfile from "../images/avatar.png";
const isActive = (history, path) => {
  if (history.location.pathname === path) return "active";
  else return "";
};

const photoUrl = () => {
  if (`${isAuthenticated().user._id}`) {
    return `${process.env.REACT_APP_API_URL}/user/photo/${`${
      isAuthenticated().user._id
    }`}?${new Date().getTime()}`;
  } else {
    return DefaultProfile;
  }
};

const DarkModeToggle = () => {
  const nightMode = localStorage.getItem("gmtNightMode") === "dark";
  if (nightMode) {
    document.documentElement.className += " dark";
  }
  const toggleThemeChange = () => {
    document.documentElement.classList.toggle("dark");
    if (document.documentElement.classList.contains("dark")) {
      localStorage.setItem("gmtNightMode", true);
      return;
    }
    localStorage.removeItem("gmtNightMode");
  };
  return (
    <Link
      href="#"
      id="night-mode"
      data-tippy-placement="left"
      title="Switch to dark mode"
      style={{ marginLeft: "auto" }}
      onClick={() => toggleThemeChange()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        fill="currentColor"
        class="bi bi-lightning-charge-fill"
        viewBox="0 0 16 16"
      >
        <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
      </svg>
    </Link>
  );
};
const Sidebar = ({ history }) => (
  <div className="sidebar">
    <div className="sidebar_header border-b border-gray-200 from-gray-100 to-gray-50 bg-gradient-to-t  uk-visible@s">
      <Link
        to="/"
        className="bg-gradient-to-bl font-semibold from-pink-400 px-6 py-3  rounded text-sm text-white to-pink-600"
      >
        DRAGONCUTE
        {/* <img src={DefaultProfile} className="logo_inverse" alt="avatar" /> */}
      </Link>
      {DarkModeToggle()}
    </div>
    <div className="border-b border-gray-20 flex justify-between items-center p-3 pl-5 relative uk-hidden@s">
      <h3 className="text-xl"> Navigation </h3>
      <span
        className="btn-mobile"
        uk-toggle="target: #wrapper ; cls: sidebar-active"
      />
    </div>
    <div className="sidebar_inner" data-simplebar>
      <div className="flex flex-col items-center my-6 uk-visible@s">
        <div className="bg-gradient-to-tr from-yellow-600 to-pink-600 p-1 rounded-full transition m-0.5 mr-2  w-24 h-24">
          <img
            src={photoUrl()}
            className="bg-gray-200 border-4 border-white rounded-full w-full h-full"
            alt="avatar"
          />
        </div>
        <Link
          to={`/user/${isAuthenticated().user._id}`}
          className="text-xl font-medium capitalize mt-4 uk-link-reset"
        >
          {`${isAuthenticated().user.name}`}
        </Link>
      </div>
      <hr className="-mx-4 -mt-1 uk-visible@s" />
      <ul>
        <li className={isActive(history, "/")}>
          <Link to="/">
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
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M260.801,382.526h-79.385c-5.523,0-10,4.477-10,10c0,27.4,22.292,49.692,49.692,49.692s49.692-22.292,49.692-49.692
		C270.801,387.003,266.324,382.526,260.801,382.526z M221.109,422.218c-12.865,0-23.846-8.225-27.96-19.692h55.92
		C244.955,413.993,233.974,422.218,221.109,422.218z"
              />
            </svg>
            <span> Feed </span>
          </Link>
        </li>
        <li className={isActive(history, `/users`)}>
          <Link to={`/users`}>
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
            <span> Explore </span>
          </Link>
        </li>
        <li>
          <Link to="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chat-square-text"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
            </svg>
            <span> Messages </span> <span className="nav-tag"> 3</span>
          </Link>
        </li>
        <li>
          <Link to="#">
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
                d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
              />
            </svg>
            <span> Trending </span>
          </Link>
        </li>
        <li>
          <Link to="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-shop"
              viewBox="0 0 16 16"
            >
              <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z" />
            </svg>
            <span> Marketplace </span>
          </Link>
        </li>
        <li
          className={isActive(
            history,
            `/user/edit/${isAuthenticated().user._id}`
          )}
        >
          <Link to={`/user/edit/${isAuthenticated().user._id}`}>
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
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span> Settings </span>
          </Link>
        </li>
        <li
          className={isActive(history, `/user/${isAuthenticated().user._id}`)}
        >
          <Link to={`/user/${isAuthenticated().user._id}`}>
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span> My Profile </span>
          </Link>
        </li>
        <li>
          <hr className="my-2" />
        </li>
        <li>
          <Link href="#" onClick={() => signOut(() => history.push("/"))}>
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span> Logout </span>
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default withRouter(Sidebar);
// import React, { Component } from "react";
// import { isAuthenticated } from "../auth";
// import { Redirect, Link } from "react-router-dom";
// import { read } from "../user/apiUser";
// import DefaultProfile from "../images/avatar.png";
// import ProfileTabs from "../user/ProfileTabs";
// import { listByUser } from "../post/apiPost";

// class Sidebar extends Component {
//   constructor() {
//     super();
//     this.state = {
//       user: { following: [], followers: [] },
//       redirectToSignin: false,
//       following: false,
//       error: "",
//       posts: [],
//     };
//   }

//   checkFollow = (user) => {
//     const jwt = isAuthenticated();
//     const match = user.followers.find((follower) => {
//       return follower._id === jwt.user._id;
//     });
//     return match;
//   };

//   clickFollowButton = (callApi) => {
//     const userId = isAuthenticated().user._id;
//     const token = isAuthenticated().token;
//     callApi(userId, token, this.state.user._id).then((data) => {
//       if (data.error) {
//         this.setState({ error: data.error });
//       } else {
//         this.setState({ user: data, following: !this.state.following });
//       }
//     });
//   };

//   init = (userId) => {
//     const token = isAuthenticated().token;
//     read(userId, token).then((data) => {
//       if (data.error) {
//         this.setState({ redirectToSignin: true });
//       } else {
//         this.setState({ user: data });
//         let following = this.checkFollow(data);
//         this.setState({ user: data, following });
//         this.loadPosts(data._id);
//       }
//     });
//   };

//   loadPosts = (userId) => {
//     const token = isAuthenticated().token;
//     listByUser(userId, token).then((data) => {
//       if (data.error) {
//         console.log(data.error);
//       } else {
//         this.setState({ posts: data });
//       }
//     });
//   };

//   componentDidMount() {
//     const userId = this.props.match.params.userId;
//     this.init(userId);
//   }

//   componentWillReceiveProps(props) {
//     const userId = props.match.params.userId;
//     this.init(userId);
//   }

//   render() {
//     const { redirectToSignin, user, posts } = this.state;
//     if (redirectToSignin) return <Redirect to="/signIn" />;
//     const photoUrl = user._id
//       ? `${process.env.REACT_APP_API_URL}/user/photo/${
//           user._id
//         }?${new Date().getTime()}`
//       : DefaultProfile;
//     return (
//       <div className="container">
//         <h2 className="mt-5 mb-5">Profile</h2>
//         <div className="row">
//           <div className="col-md-4">
//             <img
//               style={{ height: "200px", width: "auto" }}
//               className="img-thumbnail"
//               src={photoUrl}
//               onError={(i) => (i.target.src = `${DefaultProfile}`)}
//               alt={user.name}
//             />
//           </div>
//           <div className="col-md-8">
//             <div className="lead mt-2">
//               <p>Hello {user.name}</p>
//               <p>Email: {user.email}</p>
//               <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
//             </div>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col md-12 mt-5 mb-5">
//             <hr />
//             <p className="lead">{user.about}</p>
//             <hr />
//             <ProfileTabs
//               followers={user.followers}
//               following={user.following}
//               posts={posts}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Sidebar;
