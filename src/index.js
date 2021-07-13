import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Home from "./views/Home.jsx";
import Login from "./views/Pages/Login";
import Activate from "./views/Pages/Activate";
import ForgetPassword from "./views/Pages/ForgetPassword";
import ResetPassword from "./views/Pages/ResetPassword.jsx";
import { Provider, teamsTheme } from '@fluentui/react-northstar'
import RedirectRoute from "./app.route";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.render(
  <Provider theme={teamsTheme}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact render={(props) => <Login {...props} />} />
        <Route
          path="/users/password/forget"
          exact
          render={(props) => <ForgetPassword {...props} />}
        />
        <Route
          path="/users/password/reset/:token"
          exact
          render={(props) => <ResetPassword {...props} />}
        />
        <Route
          path="/users/activate/:token"
          exact
          render={(props) => <Activate {...props} />}
        />
        <RedirectRoute path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
