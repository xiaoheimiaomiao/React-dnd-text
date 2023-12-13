import React from "react";
import { Link, Outlet } from "react-router-dom";
export const Bbb = () => {
  return <div>bbb</div>;
};

export const Ccc = () => {
  return <div>ccc</div>;
};

export const ErrorPage = () => {
  return <div>Error</div>;
};
export default function App() {
  return (
    <div>
      <p>aaa</p>
      <Link to={"/bbb/111"}>to bbb</Link>
      <br />
      <Link to={"/ccc"}>to ccc</Link>
      <br />
      <Outlet />
    </div>
  );
}
