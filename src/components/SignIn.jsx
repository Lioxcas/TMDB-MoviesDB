import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import { Link } from "react-router-dom";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { setUser, user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://node-tmdb-backy.onrender.com/api/auth/",

        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const getUser = await axios.get(
        `https://node-tmdb-backy.onrender.com/api/users/${email}`
      );

      setAuth(response.data);
      setUser(getUser.data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center h-screen w-full">
        <div className="w-full bg-amber-800 rounded p-8 m-4 md:max-w-sm md:mx-auto">
          <h1 className="block w-full text-center text-xl text-gray-200 mb-6">
            Sign In
          </h1>
          <form
            className="mb-4 md:flex md:flex-wrap md:justify-between"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col mb-4 md:w-full">
              <label
                className="mb-2 uppercase font-bold text-lg text-grey-darkest"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="focus:outline-none focus:ring focus:ring-amber-500 py-2 px-3 text-grey-darkest"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col mb-6 md:w-full">
              <label
                className="mb-2 uppercase font-bold text-lg text-grey-darkest"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="focus:outline-none focus:ring focus:ring-amber-500 py-2 px-3 text-grey-darkest"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              className="block bg-amber-700 hover:bg-amber-600 text-white uppercase text-lg mx-auto p-4 rounded"
              type="submit"
            >
              Log In
            </button>
          </form>
          <Link
            to="/signup"
            className="block w-full text-center no-underline text-sm text-grey-dark hover:text-grey-darker"
          >
            Don't have an account? Sign up.
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignIn;
