import "./App.css";
import SignIn from "./components/SignIn";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Navbar/Register";
import Navbar from "./components/Navbar/Navbar";
import GetFavs from "./components/Navbar/GetFavs";
import PersistLogin from "./components/Navbar/PersistLogin";
import useAuth from "./hooks/useAuth";
import { MoreInfo } from "./components/Navbar/MoreInfo";
import SearchResultPage from "./components/Search/SearchResultPage";

function App() {
  const { auth } = useAuth();

  return (
    <>
      {" "}
      <Navbar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Register />} />
        {/*  Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<GetFavs />} />
          <Route path="/:id" element={<MoreInfo />} />
          <Route path="/search/:query" element={<SearchResultPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
