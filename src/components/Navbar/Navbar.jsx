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
      await axios.post("http://localhost:3001/api/auth/logout", null, {
        withCredentials: true,
        headers: {
          SameSite: "None",
        },
      });
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
                <li className="flex items-center justify-center  text-sm text-center font-semibold text-gray-200 border-white h-8 cursor-pointer hover:bg-white hover:text-amber-800 rounded-b-lg">
                  Search
                </li>
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
                <li className="flex items-center justify-center  text-sm text-center font-semibold text-gray-200 border-white h-8 cursor-pointer hover:bg-white hover:text-amber-800 rounded-b-lg">
                  Search
                </li>
              </ul>
            )}
          </div>
        </div>
        {/* <div className="block box-border flex-grow lg:flex lg:items-center lg:w-1/6 max-w-xs align-middle">
          <div className="text-sm lg:flex-grow"></div>
          {username ? (
            <div>
              <span>{username}</span>
              <Link
                to="/favorites"
                className="inline-block box-border text-sm px-4 py-2 leading-none rounded bg-white text-amber-800 border-amber-800 hover:border-transparent hover:text-white hover:bg-purple-500 mt-4 lg:mt-0 ml-2"
              >
                Favorites
              </Link>
              <a
                onClick={handleSignOut}
                className="inline-block box-border text-sm px-4 py-2 leading-none rounded text-gray-200 border-white hover:border-transparent hover:text-purple-500 hover:bg-gray-200 mt-4 lg:mt-0 cursor-pointer"
              >
                Sign Out
              </a>
            </div>
          ) : (
            <div>
              <Link
                to="signin"
                className="inline-block w-24 text-center box-border text-sm px-4 py-2 leading-none bg-amber-800  font-semibold rounded-md text-gray-200 border-white hover:border-transparent hover:text-amber-800 hover:bg-gray-200 mt-4 lg:mt-0"
              >
                Login
              </Link>
              <Link
                to="signup"
                className="inline-block w-24 text-center box-border text-sm px-4 py-2 leading-none rounded-md bg-white text-amber-800 font-semibold  hover:border-transparent hover:text-white hover:bg-amber-800 mt-4 lg:mt-0 ml-2"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
