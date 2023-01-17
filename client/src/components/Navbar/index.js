import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { loggedIn } = useAuth();
  console.log(loggedIn);

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
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
        {!loggedIn && (
          <>
            <Link to="/signin">
              <Button colorScheme="pink">Login</Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="pink">Register</Button>
            </Link>
          </>
        )}
        {loggedIn && (
          <>
            <Link to="/profile">
              <Button colorScheme="blue">Profile</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
