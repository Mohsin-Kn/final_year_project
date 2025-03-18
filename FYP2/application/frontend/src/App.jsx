import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import { Typography, Box } from "@mui/material";
import "./styles/App.css";
import Footer from "./components/Footer";
import CoursesPage from "./pages/CoursesPage";
import ResourcesPage from "./pages/ResourcesPage";
import InstitutesPage from "./pages/InstitutesPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WrapperComponent from "./components/Wrapper.jsx";
import { useDispatch } from "react-redux";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (user && accessToken && refreshToken) {
      dispatch({
        type: 'auth/login',
        payload: {
          user: JSON.parse(user),
          accessToken,
          refreshToken
        }
      });
    }
  }, [dispatch]);
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#EDEDED",
      }}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* <WrapperComponent> */}
          <Route
            path="/upload"
            element={
              <WrapperComponent>
                <UploadPage />
              </WrapperComponent>
            }
          />
          {/* </WrapperComponent> */}
          <Route path="/institutes" element={<InstitutesPage />} />
          <Route path="/courses/:instituteID" element={<CoursesPage />} />
          <Route path="/resources/:courseID" element={<ResourcesPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
