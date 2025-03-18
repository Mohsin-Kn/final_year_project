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
  Alert,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const Signup = () => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [campus, setCampus] = useState("");
  const [file, setFile] = useState(null);
  const [campuses, setCampuses] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [custom_alert, setCustomAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = {
      email: username,
      password: password,
      password2: password,
    };

    axios
      // .post(`${import.meta.env.VITE_BACKEND_URL}/auth/register/`, formData)
      .post(`${import.meta.env.VITE_AUTH_SERVICE_URL}/auth/register/`, formData)
      .then((response) => {
        setError("Successfully registered");
        setCustomAlert(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((error) => {
        if (error.response.data.email) {
          let email_error = error.response.data.email;
          email_error = email_error.map((email) =>
            email.replace("custom ", "")
          );
          setError(email_error);
          setCustomAlert(true);
        } else if (error.response.data.password) {
          setError(error.response.data.password);
          setCustomAlert(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
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
      {custom_alert && (
        <Alert
          icon={false}
          sx={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "black",
            color: "white",
            position: "fixed",
            top: "70px",
            right: "2%",
            zIndex: "9999",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {error}{" "}
            <button
              style={{
                background: "transparent",
                color: "white",
                paddingLeft: "20px",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => setCustomAlert(false)}
            >
              X
            </button>
          </Box>
        </Alert>
      )}
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
            // marginBottom: "15px",
            fontWeight: "bold",
            fontSize: "35px",
          }}
        >
          Signup
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            // border: "1px solid red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: window.innerWidth < 600 ? "0px" : "20px",
          }}
        >
          <input
            type="text"
            aria-label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username*"
            style={{
              width: "80%",
              marginBottom: "15px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
              fontSize: "16px",
              height: "55px",
              paddingTop: "10px",
              paddingBottom: "10px",
              paddingLeft: "20px",
              paddingRight: "20px",
              background: "none",
              borderRadius: "8px",
            }}
          />
          <input
            type="password"
            aria-label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password*"
            style={{
              width: "80%",
              marginBottom: "20px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
              fontSize: "16px",
              height: "55px",
              paddingTop: "10px",
              paddingBottom: "10px",
              paddingLeft: "20px",
              paddingRight: "20px",
              background: "none",
              borderRadius: "8px",
            }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              marginBottom: "15px",
              marginTop: "10px",
              width: "80%",
              height: "50px",
              padding: "10px",
              backgroundColor: "black",
              borderRadius: "12px",
              fontSize: "18px",
              ":hover": {
                backgroundColor: "black",
              },
            }}
          >
            {loading ? "Signing Up..." : "Signup"}
          </Button>
          {/* {error && (
            <Typography color="error">
              {error.detail || "An error occurred."}
            </Typography>
          )} */}
          <Typography
            sx={{
              fontSize: "14px",
            }}
          >
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Signup;
