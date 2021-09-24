import Home from "./../core/Home";
import Admin from "./../admin/Admin";
import ResetPassword from "./../user/ResetPassword";
import ForgotPassword from "./../user/ForgotPassword";
import Users from "./../user/Users";
import NewPost from "./../post/NewPost";
import SinglePost from "./../post/SinglePost";
import EditPost from "./../post/EditPost";
import EditProfile from "./../user/EditProfile";
import FindPeople from "./../user/FindPeople";
import Profile from "./../user/Profile";
import ContentSignIn from "../page/sign/ContentSignIn";
import ContentSignUp from "../page/sign/ContentSignUp";
import { ErrPage } from "../page/err";

export const mainRouter = [
  {
    path: "/",
    exact: true,
    Component: Home,
  },
  {
    path: "/users",
    exact: false,
    Component: Users,
  },
  {
    path: "/post/create",
    exact: false,
    Component: NewPost,
  },
  {
    path: "/post/:postId",
    exact: false,
    Component: SinglePost,
  },
  {
    path: "/post/edit/:postId",
    exact: false,
    Component: EditPost,
  },
  {
    path: "/user/edit/:userId",
    exact: false,
    Component: EditProfile,
  },
  {
    path: "/findPeople",
    exact: false,
    Component: FindPeople,
  },
  {
    path: "/user/:userId",
    exact: false,
    Component: Profile,
  },
];

export const adminRouter = [
  {
    path: "/admin",
    exact: true,
    Component: Admin,
  },
];

export const signRouter = [
  {
    path: "/signIn",
    exact: false,
    Component: ContentSignIn,
  },
  {
    path: "/signUp",
    exact: false,
    Component: ContentSignUp,
  },
  {
    path: "/forgot-password",
    exact: false,
    Component: ForgotPassword,
  },
  {
    path: "/reset-password/:resetPasswordToken",
    exact: false,
    Component: ResetPassword,
  },
];
export const errRouter = [
  {
    Component: ErrPage,
  },
];
