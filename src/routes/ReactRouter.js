import React from "react";
import { Route, Routes } from "react-router-dom";
import Hero from "../components/Hero";
import { LogIn } from "../components/Hero/LogIn";
import { SignUp } from "../components/Hero/SignUp";
import { AddNew } from "../pages/Admin";
import Basket from "../pages/Basket";
import DetailPage from "../pages/DetailPage";
import Search from "../pages/Search";

const ReactRouter = () => {
  let route = [
    { path: "/", element: <Hero />, key: 1 },
    { path: "/log_in", element: <LogIn />, key: 2 },
    { path: "/sign_up", element: <SignUp />, key: 3 },
    { path: "/admin", element: <AddNew />, key: 4 },
    { path: "/saved", element: <Basket />, key: 5 },
    { path: "/detail/:id", element: <DetailPage />, key: 6 },
    { path: "/search", element: <Search />, key: 6 },
];
  return (
    <Routes>
      {route.map((el) => (
        <Route path={el.path} element={el.element} key={el.key} />
      ))}
    </Routes>
  );
};

export default ReactRouter;
