import React, { useState } from "react";
import { Typography } from "@mui/material";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

const StatisticsSection = () => {
  const stats = [
    { label: "Contributions", value: 100 },
    { label: "Contributors", value: 100 },
    { label: "Campuses", value: 100 },
  ];

  const [viewed, setViewed] = useState(false);

  return (
    <VisibilitySensor
      onChange={(isVisible) => {
        if (isVisible && !viewed) {
          setViewed(true);
        }
      }}
      partialVisibility
    >
      <div
        style={{
          padding: "50px 0",
          backgroundColor: "#EDEDED",
          textAlign: "center",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              minWidth: "250px",
              minHeight: "250px",
              borderRadius: "30px",
              fontSize: "25px",
              fontWeight: 600,
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
              {viewed ? <CountUp end={stat.value} duration={2} /> : "0"}
            </Typography>
            <Typography variant="h6" component="div" sx={{ marginTop: "10px" }}>
              {stat.label}
            </Typography>
          </div>
        ))}
      </div>
    </VisibilitySensor>
  );
};

export default StatisticsSection;
