import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Singin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import Basket from "./pages/Basket";
import Error404 from "./pages/Error404.js";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Navbar />
          <div id="content">
            <Switch>
              <Route path="/" exact component={Products} />
              <Route path="/products/:id" component={ProductDetail} />
              <Route path="/signin" component={Singin} />
              <Route path="/signup" component={Signup} />
              <Route path="/basket" component={Basket} />
              <ProtectedRoute path="/profile" component={Profile} />
              <ProtectedRoute path="/admin" component={Admin} admin={true} />
              <Route path="*" component={Error404} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
