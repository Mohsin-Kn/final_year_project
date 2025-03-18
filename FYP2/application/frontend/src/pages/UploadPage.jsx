import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  Typography,
} from "@mui/material";

const UploadPage = () => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [campus, setCampus] = useState("");
  const [file, setFile] = useState(null);
  const [campuses, setCampuses] = useState([]);

  useEffect(() => {}, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subject", subject);
    formData.append("campus", campus);
    formData.append("file", file);

    axios
      .post("/api/pastpapers/", formData)
      .then((response) => console.log(response.data))
      .catch((error) => console.error("There was an error!", error));
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <Box
      className="upload-page"
      sx={{
        backgroundColor: "#EDEDED",
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingLeft: "6%",
        paddingRight: "6%",
        // minHeight: "100vh",
        minHeight: "100dvh",
        paddingTop: {
          xs: "60px",
          sm: "30px",
        },
      }}
    >
      <Paper
        sx={{
          width: {
            xs: "90%",
            sm: "70%",
            md: "60%",
            lg: "50%",
          },
          minWidth: "290px",
          textAlign: "center",
          // borderRadius: "31px",
          borderRadius: "25px",
          backgroundColor: "rgb(245, 245, 245)",
          paddingY: "10px",
          boxShadow: "0px 0px 15px -10px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            padding: "10px",
            marginTop: "20px",
            marginBottom: "15px",
            fontWeight: "bold",
            fontSize: "35px",
          }}
        >
          Upload To Clamp
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: window.innerWidth < 600 ? "0px" : "20px",
          }}
        >
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            sx={{
              marginBottom: "15px",
              width: "80%",
              borderRadius: "100px",
            }}
          />
          <TextField
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            sx={{
              marginBottom: "15px",
              width: "80%",
            }}
          />
          <FormControl
            sx={{
              marginBottom: "15px",
              width: "80%",
            }}
          >
            <InputLabel>Campus</InputLabel>
            <Select
              value={campus}
              onChange={(e) => setCampus(e.target.value)}
              required
            >
              {campuses.map((campus) => (
                <MenuItem key={campus.id} value={campus.id}>
                  {campus.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <input
            type="file"
            onChange={handleFileChange}
            required
            id="file-input"
            style={{ display: "none", width: "80%" }}
          />
          <label
            className="choose-file"
            htmlFor="file-input"
            style={{ width: "80%" }}
          >
            <Button
              variant="outlined"
              component="span"
              sx={{
                marginBottom: "10px",
                color: "black",
                borderColor: file ? "rgb(220, 220, 220)" : "black",
                borderRadius: "5px",
                height: "45px",
                width: "100%",
                ":hover": {
                  borderColor: file ? "rgb(220, 220, 220)" : "black",
                },
              }}
            >
              {file ? (
                <Typography variant="body2" sx={{}}>
                  {file.name}
                </Typography>
              ) : (
                "Choose File"
              )}
            </Button>
          </label>
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginBottom: "15px",
              marginTop: "20px",
              width: "80%",
              height: "50px",
              padding: "10px",
              backgroundColor: "black",
              borderRadius: "12px",
              ":hover": {
                backgroundColor: "black",
              },
            }}
          >
            Upload
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default UploadPage;
