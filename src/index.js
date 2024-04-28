import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AuthContext } from "./contex/AuthContext";
import { RecipeContext } from "./contex/RecipeContext";
import AOS from "aos";
import "aos/dist/aos.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

AOS.init();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RecipeContext>
        <AuthContext>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthContext>
      </RecipeContext>
    </Provider>
  </React.StrictMode>
);
