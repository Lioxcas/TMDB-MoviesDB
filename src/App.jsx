import "./App.css";
import SignIn from "./components/SignIn";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignOut from "./components/SignOut";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Favorites from "./components/Favorites";
import PersistLogin from "./components/PersistLogin";
import useAuth from "./hooks/useAuth";

function App() {
  const { auth } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/signup" element={<Register />} />
        {/*  Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
