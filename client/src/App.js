import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Singin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Navbar />
          <div id="content">
            <Switch>
              <Route path="/" exact component={Products}></Route>
              <Route path="/products/:id" component={ProductDetail}></Route>
              <Route path="/signin" component={Singin}></Route>
              <Route path="/signup" component={Signup}></Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
