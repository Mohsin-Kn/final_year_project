import React from "react";
import { Typography, Button } from "@mui/material";
import clampLogo from "./../images/clamp.png";
import { Link } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import StatisticsSection from "../components/StatisticsSection";
import ResourcesSection from "../components/ResourcesSection";
import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <div
      className="home-page"
      style={{
        backgroundColor: "#EDEDED",
        paddingLeft: "6%",
        paddingRight: "6%",
      }}
    >
      <div
        className="hero-section"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // minHeight: "100vh",
          minHeight: "100dvh",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Navbar />
        <div
          className="hero-section-content"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            flexWrap: "wrap",
          }}
        >
          <img
            src={clampLogo}
            style={{
              height: "90px",
              marginBottom: "5px",
            }}
          />
          <Typography
            sx={{
              fontSize: "54px",
              fontWeight: "bold",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            Keeping it <span style={{ color: "black" }}>together</span>
          </Typography>
          <Typography sx={{ textAlign: "center" }}>
            A one stop solution for all study resources
          </Typography>
        </div>
        <Button
          variant="contained"
          sx={{
            marginBottom: "-450px",
            position: "absolute",
            fontSize: "19px",
            paddingLeft: "20px",
            paddingRight: "12px",
            borderRadius: "10px",
            width: "230px",
            height: "50px",
            backgroundColor: "black",
            ":hover": {
              backgroundColor: "black",
            },
          }}
          component={Link}
          to="/institutes"
        >
          Get resources <EastIcon sx={{ marginLeft: "20px", height: "30px" }} />
        </Button>
      </div>
      <StatisticsSection />
      <ResourcesSection />
    </div>
  );
};

export default HomePage;
