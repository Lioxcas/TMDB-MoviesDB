import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import SearchBar from "../Search/SearchBar";
import useUser from "../../hooks/useUser";
import cookie from "../../assets/cookie.png";

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const { auth } = useAuth();
  const { username } = auth;
  const { setUser } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let prevScrollPos = window.scrollY;
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
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
      setUser({});
      navigate("/");
      window.location.reload();
    } catch {
      (error) => console.error(error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex justify-between flex-wrap bg-transparent p-4">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to="/">
            <span className="font-semibold text-xl align-middle tracking-tight">
              Cinema Co
              <img
                src={cookie}
                alt="cinema cookie"
                className="absolute inline-block h-6 p-"
              />
              <img
                src={cookie}
                alt="cinema cookie"
                className="relative inline-block h-6"
              />
              kie
            </span>
          </Link>
        </div>
        <div className=" box-border flex-grow flex lg:items-center lg:w-1/6 max-w-xs align-middle">
          <div className="text-sm flex-grow"></div>
          <div className="account-box mr-8 " onClick={toggleMenu}>
            <span class="material-symbols-outlined account mb-2">
              account_circle
            </span>
            {!username && isMenuOpen && (
              <ul className="bg-amber-800 w-48 rounded-lg absolute mt-40 mr-24">
                <Link to="signin">
                  <li className="flex items-center justify-center text-sm text-center font-semibold text-gray-200 border-white border-b-2 border-white-500 h-8 cursor-pointer hover:bg-white hover:text-amber-800 rounded-t-lg  ">
                    Login
                  </li>
                </Link>
                <Link to="signup">
                  <li className="flex items-center justify-center  text-sm text-center font-semibold text-gray-200 border-white border-b-2 border-white-500 h-8 cursor-pointer hover:bg-white hover:text-amber-800">
                    Sign Up
                  </li>
                </Link>
                <Link
                  to="search"
                  className="flex items-center justify-center  text-sm text-center font-semibold text-gray-200 border-white h-8 cursor-pointer hover:bg-white hover:text-amber-800 rounded-b-lg"
                >
                  Search
                </Link>
              </ul>
            )}
            {username && isMenuOpen && (
              <ul className="bg-amber-800 w-48 rounded-lg absolute mt-40 mr-20">
                <Link to="signin">
                  <li className="flex items-center justify-center text-sm text-center font-semibold text-gray-200 border-white border-b-2 border-white-500 h-8 cursor-pointer hover:bg-white hover:text-amber-800 rounded-t-lg  ">
                    {username}
                  </li>
                </Link>
                <Link
                  to="/favorites"
                  className="flex items-center justify-center text-sm text-center font-semibold text-gray-200 border-white border-b-2 border-white-500 h-8 cursor-pointer hover:bg-white hover:text-amber-800 rounded-t-lg "
                >
                  Favorites
                </Link>
                <a
                  onClick={handleSignOut}
                  className="flex items-center justify-center text-sm text-center font-semibold text-gray-200 border-white border-b-2 border-white-500 h-8 cursor-pointer hover:bg-white hover:text-amber-800 rounded-t-lg "
                >
                  Sign Out
                </a>
                <Link
                  to="search"
                  className="flex items-center justify-center  text-sm text-center font-semibold text-gray-200 border-white h-8 cursor-pointer hover:bg-white hover:text-amber-800 rounded-b-lg"
                >
                  Search
                </Link>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
