import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const UploadForm = () => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [campus, setCampus] = useState("");
  const [file, setFile] = useState(null);
  const [campuses, setCampuses] = useState([]);

  useEffect(() => {
    axios
      .get("/api/campuses/")
      .then((response) => setCampuses(response.data))
      .catch((error) => console.error("There was an error!", error));
  }, []);

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

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        label="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      />
      <FormControl>
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
        onChange={(e) => setFile(e.target.files[0])}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Upload
      </Button>
    </form>
  );
};

export default UploadForm;
