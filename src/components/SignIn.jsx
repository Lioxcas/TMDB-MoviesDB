import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";

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
        "https://bespoke-truffle-3baa6f.netlify.app/api/auth/",

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
        `https://bespoke-truffle-3baa6f.netlify.app/api/users/${email}`
      );

      setAuth(response.data);
      setUser(getUser.data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center pt-16 ">
      <div className="flex flex-col items-center w-1/3 h-60 rounded-xl bg-purple-500 justify-center">
        <label className="text-xl text-gray-900">
          Email:
          <input
            className="focus:outline-none focus:ring focus:ring-purple-300 sm:w-auto w-64 mb-2 ml-10 rounded-sm text-white p-1 pl-2 bg-gray-800"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="text-xl text-gray-900">
          Password:
          <input
            type="password"
            className="focus:outline-none focus:ring focus:ring-purple-300 sm:w-auto  w-64 rounded-sm ml-1 text-white p-1 pl-2 bg-gray-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>

      <button
        type="submit"
        className="text-sm px-4 py-2 leading-none border rounded text-purple-500 border-purple-500 hover:border-transparent hover:text-white hover:bg-purple-500 mt-4 lg:mt-4 ml-2"
      >
        Sign In
      </button>
    </form>
  );
};

export default SignIn;
