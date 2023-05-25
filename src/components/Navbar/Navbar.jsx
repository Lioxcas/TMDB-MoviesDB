import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import SearchBar from "../Search/SearchBar";

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const { auth } = useAuth();
  const { username } = auth;
  const navigate = useNavigate();

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 1);
      prevScrollPos = currentScrollPos;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await axios.post(
        `https://node-tmdb-backy.onrender.com/api/auth/logout`,
        null,
        {
          withCredentials: true,
        }
      );
      navigate("/");
      window.location.reload();
    } catch {
      (error) => console.error(error);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-between flex-wrap bg-black border-b-2 border-purple-500 p-4">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to="/">
            <span className="font-semibold text-xl tracking-tight">
              Cinema Cookie
            </span>
          </Link>
        </div>
        <SearchBar className="mx-auto" />
        <div className="block flex-grow lg:flex lg:items-center lg:w-1/6 max-w-xs">
          <div className="text-sm lg:flex-grow"></div>
          {username ? (
            <div>
              <span>Bienvenido,{username}!</span>
              <Link
                to="/favorites"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-purple-500 border-purple-500 hover:border-transparent hover:text-white hover:bg-purple-500 mt-4 lg:mt-0 ml-2"
              >
                Favorites
              </Link>
              <a
                onClick={handleSignOut}
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-purple-500 hover:bg-white mt-4 lg:mt-0 cursor-pointer"
              >
                Sign Out
              </a>
            </div>
          ) : (
            <div>
              <Link
                to="signin"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-purple-500 hover:bg-white mt-4 lg:mt-0"
              >
                Sign In
              </Link>
              <Link
                to="signup"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-purple-500 border-purple-500 hover:border-transparent hover:text-white hover:bg-purple-500 mt-4 lg:mt-0 ml-2"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
