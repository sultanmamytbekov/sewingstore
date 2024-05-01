import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Hero from "../components/Hero";
import { LogIn } from "../components/Hero/LogIn";
import { SignUp } from "../components/Hero/SignUp";
import { AddNew } from "../pages/Admin";
import Basket from "../pages/Basket";
import DetailPage from "../pages/DetailPage";
import Search from "../pages/Search";
import Foouter from "../components/Foouter";
import { useSelector } from "react-redux";
import Header from "../components/Header";

const ReactRouter = () => {
  let route = [
    { path: "/", element: <Hero />, key: 1 },
    { path: "/admin", element: <AddNew />, key: 3 },
    { path: "/detail/:id", element: <DetailPage />, key: 4 },
    { path: "/search", element: <Search />, key: 5 },
  ];
  let SIGN = [
    { path: "/log_in", element: <LogIn />, key: 1 },
    { path: "/sign_up", element: <SignUp />, key: 2 },
    { path: "/saved", element: <Basket />, key: 3 },
  ];

  const { user } = useSelector((s) => s);
  function User() {
    if (!user) {
      localStorage.removeItem("save");
    }
  }
  useEffect(() => {
    User();
  }, []);
  return (
    <Routes>
      {route.map((el) => (
        <Route
          path={el.path}
          element={
            <>
              <Header />
              {el.element}
              <Foouter />
            </>
          }
          key={el.key}
        />
      ))}
      {SIGN.map((el) => (
        <>
          <Route key={el.key} path={el.path} element={el.element} />
        </>
      ))}
    </Routes>
  );
};

export default ReactRouter;
