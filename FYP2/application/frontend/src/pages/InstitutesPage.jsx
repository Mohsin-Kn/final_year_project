import React, { useState, useEffect } from "react";
import { Box, Grid, Paper, Typography, Button, InputBase } from "@mui/material";
import { Link } from "react-router-dom";
import clampLogo from "./../images/clamp.png";
import "./../styles/InstitutesPage.css";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const InstitutesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(false);

  const auth = useSelector((state) => state.auth);

  // console.log(auth);

  // const filteredInstitutes = institutes.filter(
  //   (institute) =>
  //     institute.institute_name
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase()) ||
  //     (institute.institute_description &&
  //       institute.institute_description
  //         .toLowerCase()
  //         .includes(searchTerm.toLowerCase()))
  // );

  const filteredInstitutes = institutes.filter(
    (institute) =>
      institute.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (institute.description &&
        institute.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const fetchInstitutes = async () => {
    setLoading(true);
    try {
      // const response = await databases.listDocuments(
      //   import.meta.env.VITE_DATABASE_ID,
      //   import.meta.env.VITE_COLLECTION_ID_INSTITUTES
      // );

      // setInstitutes(response.documents);
      const response = await axios.get(
        `${import.meta.env.VITE_INSTITUTES_SERVICE_URL}/institutes/`
      );
      console.log(response);
      setInstitutes(response.data);
    } catch (error) {
      console.error("Error fetching institutes: ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInstitutes();
  }, []);

  return (
    <div
      className="institutes-container"
      style={{
        // minHeight: "100vh",
        minHeight: "100dvh",
        paddingLeft: "6%",
        paddingRight: "6%",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#EDEDED",
      }}
    >
      {/* <Navbar /> */}
      <div
        className="institutes-page-content"
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
        <Box
          className="searchbar-container"
          sx={{
            display: "flex",
            minHeight: "55px",
            minWidth: "230px",
            marginBottom: "40px",
          }}
        >
          <InputBase
            sx={{
              border: "1px solid rgb(210, 210, 210)",
              flexGrow: 1,
              backgroundColor: "rgb(245, 245, 245)",
              borderRadius: "15px",
              paddingLeft: "30px",
              height: "100%",
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search your institute"
          />
        </Box>

        <div
          className="institute-papers-container"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {loading ? (
            <Loader />
          ) : (
            filteredInstitutes.map((institute) => (
              <Paper
                className="institute-paper"
                sx={{
                  display: "flex",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  borderRadius: "20px",
                  height: "fit-content",
                  backgroundColor: "rgb(245, 245, 245)",
                  boxShadow: "none",
                  border: "1px solid rgb(210, 210, 210)",
                  marginBottom: "20px",
                }}
                key={institute.$id}
              >
                <Grid
                  container
                  spacing={2}
                  rowGap={1}
                  sx={{
                    margin: "0px",
                    height: "100%",
                  }}
                >
                  <Grid
                    item
                    className="logo"
                    xs={12}
                    sm={12}
                    preTablet={1.3}
                    sx={{
                      paddingLeft: "0px !important",
                      paddingTop: "0px !important",
                    }}
                  >
                    <div
                      style={{
                        height: "70px",
                        width: "70px",
                        borderRadius: "50%",
                        margin: "0px auto",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
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
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    preTablet={8.2}
                    sx={{
                      paddingLeft: "0px !important",
                      paddingTop: "0px !important",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        flexGrow: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography
                        className="institute-title-typography"
                        sx={{
                          color: "black",
                          fontSize: "18px",
                          fontWeight: "600",
                          paddingLeft: "25px",
                          paddingRight: "25px",
                          flexWrap: "wrap",
                        }}
                      >
                        {institute.name}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    preTablet={2.5}
                    sx={{
                      paddingLeft: "0px !important",
                      paddingTop: "10px !important",
                      paddingBottom: "5px !important",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      className="see-resources-button"
                      variant="outlined"
                      sx={{
                        color: "black",
                        border: "2px solid black",
                        height: "38px",
                        borderRadius: "8px",
                        flexWrap: "nowrap",
                        padding: "0px",
                        minWidth: "115px",
                        ":hover": {
                          color: "white",
                          border: "2px solid black",
                          backgroundColor: "black",
                          borderRadius: "8px",
                        },
                      }}
                      component={Link}
                      to={`/courses/${institute.id}`}
                    >
                      See Resources
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default InstitutesPage;
