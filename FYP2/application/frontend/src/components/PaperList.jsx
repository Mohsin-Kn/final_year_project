import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, ListItem, ListItemText } from "@mui/material";

const PaperList = () => {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/pastpapers/")
      .then((response) => setPapers(response.data))
      .catch((error) => console.error("There was an error!", error));
  }, []);

  return (
    <List>
      {papers.map((paper) => (
        <ListItem key={paper.id}>
          <ListItemText
            primary={paper.title}
            secondary={`Subject: ${paper.subject}, Campus: ${paper.campus}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default PaperList;
