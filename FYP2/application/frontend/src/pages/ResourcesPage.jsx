import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Tab, Link, Paper } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab/";
import { useParams } from "react-router-dom";
import clampLogo from "./../images/clamp.png";
import "./../styles/ResourcesPage.css";
import Loader from "../components/Loader";
import axios from "axios";

const Resources = ({ resource }) => {
  return (
    <Grid
      item
      xs={12}
      tablet={6}
      key={resource.id}
      sx={{
        paddingTop: "10px",
        paddingBottom: "10px",
        paddingLeft: "10px !important",
        paddingRight: "10px !important",
        margin: "0px auto",
      }}
    >
      <Paper
        className="paper-div"
        style={{
          margin: "0 auto",
          padding: "16px",
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "rgb(245, 245, 245)",
          border: "1px solid rgb(210, 210, 210)",
          boxShadow: "none",
        }}
      >
        <div
          style={{
            height: "45px",
            width: "45px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "15px",
            boxShadow: "0px 0px 2px #888888",
          }}
        >
          <img
            src={clampLogo}
            style={{
              width: "inherit",
            }}
          />
        </div>
        <Link
          href={resource.link}
          className="resource-name-anchor-tag"
          target="_blank"
          rel="noopener noreferrer"
        >
          {resource.name}
        </Link>
      </Paper>
    </Grid>
  );
};

const ResourcesPage = () => {
  const { courseID } = useParams();
  const [courseName, setCourseName] = useState("");
  const [resources, setResources] = useState([]);
  const [value, setValue] = useState("past-papers");
  const [loading, setLoading] = useState(false);

  const [courseOutlineResources, setCourseOutlineResources] = useState([]);
  const [pastPapersResources, setPastPapersResources] = useState([]);
  const [assignmentsResources, setAssignmentsResources] = useState([]);
  const [quizzesResources, setQuizzesResources] = useState([]);
  const [booksResources, setBooksResources] = useState([]);
  const [labTasksResources, setLabTasksResources] = useState([]);
  const [othersResources, setOthersResources] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchResources = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_RESOURCES_SERVICE_URL}/resources/${courseID}`
      );

      let filteredResources = response.data;
      setResources(filteredResources);
      const course_outline = filteredResources.filter((resource) => {
        return resource.resource_type === "course-outline";
      });
      setCourseOutlineResources(course_outline);
      const past_papers = filteredResources.filter((resource) => {
        return resource.resource_type === "past-papers";
      });
      setPastPapersResources(past_papers);
      const assignments = filteredResources.filter((resource) => {
        return resource.resource_type === "assignments";
      });
      setAssignmentsResources(assignments);
      const quizzes = filteredResources.filter((resource) => {
        return resource.resource_type === "quizzes";
      });
      setQuizzesResources(quizzes);
      const books = filteredResources.filter((resource) => {
        return resource.resource_type === "books";
      });
      setBooksResources(books);
      const lab_tasks = filteredResources.filter((resource) => {
        return resource.resource_type === "lab-tasks";
      });
      setLabTasksResources(lab_tasks);
      const others = filteredResources.filter((resource) => {
        return resource.resource_type === "others";
      });
      setOthersResources(others);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <div
      className="resources-page-container"
      style={{
        minHeight: "100vh",
        paddingTop: "80px",
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: {
            xs: "35px",
            sm: "50px",
          },
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        {courseName}
        {/* Isko REDUX ky through krna hy */}
      </Typography>
      <TabContext value={value}>
        <Box
          sx={{
            paddingX: "5px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TabList
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            sx={{
              boxShadow: "0px 0px 4px #888888",
              borderRadius: "12px",
            }}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Course Outline" value="course-outline" />
            <Tab label="Past Papers" value="past-papers" />
            <Tab label="Assignments" value="assignments" />
            <Tab label="Quizzes" value="quizzes" />
            <Tab label="Books" value="books" />
            <Tab label="Lab Tasks" value="lab-tasks" />
            <Tab label="Others" value="others" />
          </TabList>
        </Box>
        <TabPanel className="tab-content-TabPanel" value="course-outline">
          <Grid
            className="grid-container"
            container
            sx={{
              marginTop: "20px",
              marginBottom: "20px",
              margin: "20px auto 20px auto",
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              maxWidth: "2000px",
            }}
          >
            {!loading ? (
              courseOutlineResources.length > 0 ? (
                courseOutlineResources.map((resource) => (
                  <Resources key={resource.$id} resource={resource} />
                ))
              ) : (
                <Typography sx={{ margin: "0 auto", marginTop: "20px" }}>
                  No Course Outline available.
                </Typography>
              )
            ) : (
              <Loader />
            )}
          </Grid>
          {loading && <Loader />}
        </TabPanel>
        <TabPanel className="tab-content-TabPanel" value="past-papers">
          <Grid
            className="grid-container"
            container
            sx={{
              marginTop: "20px",
              marginBottom: "20px",
              margin: "20px auto 20px auto",
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              maxWidth: "2000px",
            }}
          >
            {!loading &&
              (pastPapersResources.length > 0 ? (
                pastPapersResources.map((resource) => (
                  <Resources key={resource.$id} resource={resource} />
                ))
              ) : (
                <Typography sx={{ margin: "0 auto", marginTop: "20px" }}>
                  No Past Papers available.
                </Typography>
              ))}
          </Grid>
          {loading && <Loader />}
        </TabPanel>
        <TabPanel className="tab-content-TabPanel" value="assignments">
          <Grid
            className="grid-container"
            container
            sx={{
              marginTop: "20px",
              marginBottom: "20px",
              margin: "20px auto 20px auto",
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              maxWidth: "2000px",
            }}
          >
            {!loading &&
              (assignmentsResources.length > 0 ? (
                assignmentsResources.map((resource) => (
                  <Resources key={resource.$id} resource={resource} />
                ))
              ) : (
                <Typography sx={{ margin: "0 auto", marginTop: "20px" }}>
                  No Assignments available.
                </Typography>
              ))}
          </Grid>
          {loading && <Loader />}
        </TabPanel>
        <TabPanel className="tab-content-TabPanel" value="quizzes">
          <Grid
            className="grid-container"
            container
            sx={{
              marginTop: "20px",
              marginBottom: "20px",
              margin: "20px auto 20px auto",
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              maxWidth: "2000px",
            }}
          >
            {!loading &&
              (quizzesResources.length > 0 ? (
                quizzesResources.map((resource) => (
                  <Resources key={resource.$id} resource={resource} />
                ))
              ) : (
                <Typography sx={{ margin: "0 auto", marginTop: "20px" }}>
                  No Quizzes available.
                </Typography>
              ))}
          </Grid>
          {loading && <Loader />}
        </TabPanel>
        <TabPanel className="tab-content-TabPanel" value="books">
          <Grid
            className="grid-container"
            container
            sx={{
              marginTop: "20px",
              marginBottom: "20px",
              margin: "20px auto 20px auto",
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              maxWidth: "2000px",
            }}
          >
            {!loading &&
              (booksResources.length > 0 ? (
                booksResources.map((resource) => (
                  <Resources key={resource.$id} resource={resource} />
                ))
              ) : (
                <Typography sx={{ margin: "0 auto", marginTop: "20px" }}>
                  No Books available.
                </Typography>
              ))}
          </Grid>
          {loading && <Loader />}
        </TabPanel>
        <TabPanel className="tab-content-TabPanel" value="lab-tasks">
          <Grid
            className="grid-container"
            container
            sx={{
              marginTop: "20px",
              marginBottom: "20px",
              margin: "20px auto 20px auto",
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              maxWidth: "2000px",
            }}
          >
            {!loading &&
              (labTasksResources.length > 0 ? (
                labTasksResources.map((resource) => (
                  <Resources key={resource.$id} resource={resource} />
                ))
              ) : (
                <Typography sx={{ margin: "0 auto", marginTop: "20px" }}>
                  No Lab Tasks available.
                </Typography>
              ))}
          </Grid>
          {loading && <Loader />}
        </TabPanel>
        <TabPanel className="tab-content-TabPanel" value="others">
          <Grid
            className="grid-container"
            container
            sx={{
              marginTop: "20px",
              marginBottom: "20px",
              margin: "20px auto 20px auto",
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              maxWidth: "2000px",
            }}
          >
            {!loading &&
              (othersResources.length > 0 ? (
                othersResources.map((resource) => (
                  <Resources key={resource.$id} resource={resource} />
                ))
              ) : (
                <Typography sx={{ margin: "0 auto", marginTop: "20px" }}>
                  No other resources available.
                </Typography>
              ))}
          </Grid>
          {loading && <Loader />}
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default ResourcesPage;
