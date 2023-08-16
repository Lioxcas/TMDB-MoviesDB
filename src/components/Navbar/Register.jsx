import axios from "../../axios";
import React from "react";
import { useState } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password === confirmPassword) {
      axios
        .post("https://node-tmdb-backy.onrender.com/api/users/signUp", {
          username,
          email,
          password,
        })
        .then(() => {
          setShowSuccessMessage(true);
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        })
        .catch((error) => console.log(error));
    } else {
      alert("Passwords did not match");
    }
  };

  return (
    /*     <form onSubmit={handleSubmit} className="flex flex-col items-center pt-16 ">
      <h1 className="text-xl mb-4">Sign Up</h1>
      <div className="flex flex-col w-2/5 h-[360px] rounded-xl mb-4 bg-amber-800 justify-center">
        <label className="mb-2 uppercase font-bold text-lg text-gray-900">
          Username:
          <input
            type="text"
            autoComplete="off"
            className="focus:outline-none focus:ring focus:ring-amber-500 rounded-sm text-white bg-gray-800 py-2 px-2 mb-4"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>
        <label className="text-xl text-gray-900">
          Email:
          <input
            className="focus:outline-none focus:ring focus:ring-amber-500 sm:w-auto w-64 mb-4 ml-10 rounded-sm text-white p-1 pl-2 bg-gray-800"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="text-xl text-gray-900">
          Password:
          <input
            type="password"
            className="focus:outline-none focus:ring focus:ring-amber-500 w-fit mb-4 ml-10 rounded-sm text-white p-1 pl-2 bg-gray-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label className="text-xl text-gray-900">
          Repeat Password:
          <input
            className="focus:outline-none focus:ring focus:ring-amber-500 sm:w-auto rounded-sm ml-1 text-white p-1 pl-2 bg-gray-800"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </label>
      </div>
      <button
        type="submit"
        className="text-sm px-4 py-2 leading-none rounded text-white bg-amber-800 border-transparent hover:border-transparent hover:text-white hover:bg-amber-700 mt-4 lg:mt-4 ml-2"
      >
        Create Account
      </button>
      {showSuccessMessage && (
        <Message
          success
          header="Registration Successful!"
          content="Please Login"
        />
      )}
    </form> */
    <>
      <div className="flex items-center h-screen w-full">
        <div className="w-full bg-amber-800 rounded p-8 m-4 md:max-w-sm md:mx-auto">
          <h1 className="block w-full text-center text-xl text-gray-200 mb-6">
            Sign Up
          </h1>
          <form
            className="mb-4 md:flex md:flex-wrap md:justify-between"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col mb-4 md:w-full">
              <label
                className="mb-2 uppercase tracking-wide font-bold text-lg text-grey-darkest"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="focus:outline-none focus:ring focus:ring-amber-500 py-2 px-3 text-grey-darkest"
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>

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
            <div className="flex flex-col mb-6 md:w-full">
              <label
                className="mb-2 uppercase font-bold text-lg text-grey-darkest"
                htmlFor="confirm_password"
              >
                Confirm Password
              </label>
              <input
                className="focus:outline-none focus:ring focus:ring-amber-500 py-2 px-3 text-grey-darkest"
                type="password"
                name="confim_password"
                id="confirm_password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </div>
            <button
              className="block bg-amber-700 hover:bg-amber-600 text-white uppercase text-lg mx-auto p-4 rounded"
              type="submit"
            >
              Create Account
            </button>
            {showSuccessMessage && (
              <Message
                success
                header="Registration Successful!"
                content="Please Login"
              />
            )}
          </form>
          <Link
            to="/signin"
            className="block w-full text-center no-underline text-sm text-grey-dark hover:text-grey-darker"
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
