import React from "react";
import Posts from "../post/Posts";
import FindPeople from "../user/FindPeople";

const Home = () => (
  <div className="container m-auto">
    <h1 className="lg:text-2xl text-lg font-extrabold leading-none text-gray-900 tracking-tight mb-5">
      Feed
    </h1>
    <div className="lg:flex justify-center lg:space-x-10 lg:space-y-0 space-y-5">
      <Posts />
      <FindPeople />
    </div>
  </div>
);

export default Home;
