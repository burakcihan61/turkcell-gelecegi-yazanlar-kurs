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
              <ProtectedRoute path="/profile" component={Profile} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
