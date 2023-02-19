import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import useAuth from "../hooks/useAuth.js";

const Navbar = () => {
  const { auth } = useAuth();
  const { username } = auth;

  useEffect(() => {
    console.log("esto es auth", auth);
  }, []);

  const handleSignOut = async () => {
    try {
      await axios.post("http://localhost:3001/api/auth/logout", null, {
        withCredentials: true,
        headers: {
          SameSite: "None",
        },
      });
      window.location.reload();
    } catch {
      (error) => console.log(error);
    }
  };

  return (
    <Menu className="navbar">
      {username ? (
        <>
          <Menu.Item name="welcome"> {username} </Menu.Item>
          <Link to="/favorites">
            <Menu.Item name="favorites"> Favorites </Menu.Item>
          </Link>
          <Menu.Item name="logout" onClick={handleSignOut}>
            Logout
          </Menu.Item>
        </>
      ) : (
        <>
          <Link to="/signin">
            <Menu.Item name="login"> Login </Menu.Item>
          </Link>

          <Link to="signup">
            <Menu.Item name="register">Register</Menu.Item>
          </Link>
        </>
      )}
    </Menu>
  );
};

export default Navbar;
