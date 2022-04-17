import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { fetchImages, getList, getTeams } from "./features/user/teamSlice";
import { validateSession } from "./features/user/userSlice";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Workspace from "./pages/Workspace";

function App() {
  const dispatch = useDispatch();
  const { logged } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(validateSession());
    if (logged === true) {
      dispatch(fetchImages());
      dispatch(getTeams());
    }
  }, [dispatch, logged]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/workspace/:id" element={<Workspace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
