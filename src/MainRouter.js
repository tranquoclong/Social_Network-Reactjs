// import React from "react";
// import Home from "./core/Home";
// import Menu from "./core/Menu";
// import Sidebar from "./core/Sidebar";
// import Users from "./user/Users";
// import Admin from "./admin/Admin";
// import SignIn from "./user/SignIn";
// import Profile from "./user/Profile";
// import NewPost from "./post/NewPost";
// import EditPost from "./post/EditPost";
// import SinglePost from "./post/SinglePost";
// import FindPeople from "./user/FindPeople";
// import EditProfile from "./user/EditProfile";
// import PrivateRoute from "./auth/PrivateRoute";
// import ResetPassword from "./user/ResetPassword";
// import ForgotPassword from "./user/ForgotPassword";

// const MainRouter = () => (
//   <>
//     <Switch>
//       <div id="wrapper">
//         <Sidebar />
//         <div className="main_content">
//           <Menu />
//           <PrivateRoute exact path="/" component={Home} />
//         </div>

//         <PrivateRoute exact path="/admin" component={Admin} />
//         <Route exact path="/forgot-password" component={ForgotPassword} />
//         <Route
//           exact
//           path="/reset-password/:resetPasswordToken"
//           component={ResetPassword}
//         />
//         <PrivateRoute exact path="/post/create" component={NewPost} />
//         <Route exact path="/post/:postId" component={SinglePost} />
//         <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />
//         <Route exact path="/users" component={Users} />
//         <Route exact path="/signUp" component={SignUp} />

//         <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
//         <PrivateRoute exact path="/findpeople" component={FindPeople} />
//         <PrivateRoute exact path="/user/:userId" component={Profile} />
//       </div>
//     </Switch>
//     <Switch>
//       <Route exact path="/signIn" component={SignIn} />
//     </Switch>
//   </>
// );

// export default MainRouter;
import "./App.css";
import { BrowserRouter, Switch } from "react-router-dom";
import {
  adminRouter,
  signRouter,
  mainRouter,
  errRouter,
} from "./configs/router";
import RouterMainTemplate from "./templates/Main";
import RouterAdminTemplate from "./templates/Admin";
import RouterSignTemplate from "./templates/Sign";
import RouterErrTemplate from "./templates/Err";

function MainRouter() {
  const renderMainRouter = () => {
    return mainRouter.map(({ path, exact, Component }) => {
      return (
        <RouterMainTemplate
          path={path}
          exact={exact}
          Component={Component}
        ></RouterMainTemplate>
      );
    });
  };
  const renderAdminRouter = () => {
    return adminRouter.map(({ path, exact, Component }) => {
      return (
        <RouterAdminTemplate
          path={path}
          exact={exact}
          Component={Component}
        ></RouterAdminTemplate>
      );
    });
  };
  const renderSignRouter = () => {
    return signRouter.map(({ path, exact, Component }) => {
      return (
        <RouterSignTemplate
          path={path}
          exact={exact}
          Component={Component}
        ></RouterSignTemplate>
      );
    });
  };
  const renderErrRouter = () => {
    return errRouter.map(({ Component }) => {
      return <RouterErrTemplate Component={Component}></RouterErrTemplate>;
    });
  };
  return (
    <BrowserRouter>
      <Switch>
        {renderMainRouter()}
        {renderAdminRouter()}
        {renderSignRouter()}
        {renderErrRouter()}
      </Switch>
    </BrowserRouter>
  );
}

export default MainRouter;
