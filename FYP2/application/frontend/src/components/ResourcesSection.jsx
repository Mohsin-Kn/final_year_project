import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import CourseOutlineIcon from "@mui/icons-material/Book"; // Example icon
import PastPapersIcon from "@mui/icons-material/Assignment"; // Example icon
import AssignmentsIcon from "@mui/icons-material/AssignmentTurnedIn"; // Example icon
import QuizzesIcon from "@mui/icons-material/Quiz"; // Example icon
import BooksIcon from "@mui/icons-material/LibraryBooks"; // Example icon
import LabTasksIcon from "@mui/icons-material/Science"; // Example icon
import OthersIcon from "@mui/icons-material/MoreHoriz"; // Example icon

const resources = [
  {
    icon: <CourseOutlineIcon />,
    title: "Course Outlines",
    description: "Detailed outlines of the courses offered.",
  },
  {
    icon: <PastPapersIcon />,
    title: "Past Papers",
    description: "Access to previous exam papers.",
  },
  {
    icon: <AssignmentsIcon />,
    title: "Assignments",
    description: "List of assignments for each course.",
  },
  {
    icon: <QuizzesIcon />,
    title: "Quizzes",
    description: "Quizzes to test your knowledge.",
  },
  {
    icon: <BooksIcon />,
    title: "Books",
    description: "Recommended books for each subject.",
  },
  {
    icon: <LabTasksIcon />,
    title: "Lab Tasks",
    description: "Tasks and projects for lab sessions.",
  },
  {
    icon: <OthersIcon />,
    title: "Others",
    description: "Additional resources available.",
  },
];

const ResourcesSection = () => {
  return (
    <div style={{ padding: "20px", textAlign: "center", marginBottom: "40px" }}>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: "40px" }}>
        Available Resources
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {resources.map((resource, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: "5px",
                // border: "1px solid gray",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                {resource.icon}
                <Typography variant="h6">{resource.title}</Typography>
                <Typography variant="body2">{resource.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ResourcesSection;
