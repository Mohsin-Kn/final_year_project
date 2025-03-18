import React from "react";
import { Typography } from "@mui/material";

const Footer = () => {
  return (
    <div
      component="footer"
      style={{
        backgroundColor: "black",
        color: "#fff",

        minHeight: "64px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Typography variant="body2" color="inherit">
          &copy; {new Date().getFullYear()} Clamp. All rights reserved.
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
