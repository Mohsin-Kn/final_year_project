import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography, Button, InputBase } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import clampLogo from "./../images/clamp.png";
import Loader from "../components/Loader";
import axios from "axios";

const CoursesPage = () => {
  const { instituteID } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.description &&
        course.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_COURSES_SERVICE_URL}/courses/${instituteID}`
      );

      setCourses(response.data);
      // console.log(response);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div
      className="courses-page-container"
      style={{
        minHeight: "100dvh",
        paddingLeft: "6%",
        paddingRight: "6%",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#EDEDED",
      }}
    >
      <div
        className="courses-page-content"
        style={{
          paddingTop: "10px",
          paddingBottom: "10px",
          marginTop: "80px",
          marginBottom: "60px",
          width: "88%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={clampLogo}
          style={{
            height: "80px",
            marginBottom: "10px",
          }}
        />
        <Typography sx={{ textAlign: "center", marginBottom: "30px" }}>
          We Clamped all your required study material here
        </Typography>
        <Box
          sx={{
            display: "flex",
            height: "55px",
            width: {
              xs: "90%",
              sm: "80%",
              md: "70%",
              lg: "60%",
              xl: "50%",
            },
            minWidth: "230px",
          }}
        >
          <InputBase
            sx={{
              border: "1px solid black",
              flexGrow: 1,
              borderRadius: "12px",
              paddingLeft: "30px",
              height: "100%",
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Courses"
          />
        </Box>
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: "20px",
            marginBottom: "20px",
            marginLeft: "0px",
            marginRight: "0px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {loading ? (
            <Loader />
          ) : (
            filteredCourses.map((course) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={course.id}
                sx={{
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  minWidth: "280px",
                }}
              >
                <Paper
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px",
                    borderRadius: "20px",
                    cursor: "default",
                    minHeight: "160px",
                    flexGrow: 1,
                    backgroundColor: "rgb(245, 245, 245)",
                    boxShadow: "0px 0px 15px -10px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "black",
                      fontSize: "24px",
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}
                  >
                    {course.name}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#A0A0A0",
                      fontSize: "16px",
                      marginBottom: "10px",
                    }}
                  >
                    Course Code: {course.code}
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "black",
                      border: "2px solid black",
                      width: "150px",
                      borderRadius: "8px",
                      ":hover": {
                        color: "white",
                        border: "2px solid black",
                        backgroundColor: "black",
                        borderRadius: "8px",
                      },
                    }}
                    component={Link}
                    to={`/resources/${course.id}`}
                  >
                    See Resources
                  </Button>
                </Paper>
              </Grid>
            ))
          )}
        </Grid>
      </div>
    </div>
  );
};

export default CoursesPage;
