import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className="logo">
          <Link to="/">eCommerce</Link>
        </div>
        <div className={styles.menu}>
          <ul>
            <li>
              <Link to="/">Prodacts</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.right}>
        <Link to="/signin">
          <Button colorScheme="pink">Login</Button>
        </Link>
        <Link to="/signup">
          <Button colorScheme="pink">Register</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
