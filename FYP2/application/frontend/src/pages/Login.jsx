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
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";

const Login = ({ setIsLoggedIn }) => {
  // const [title, setTitle] = useState("");
  // const [subject, setSubject] = useState("");
  // const [campus, setCampus] = useState("");
  // const [file, setFile] = useState(null);
  // const [campuses, setCampuses] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [custom_alert, setCustomAlert] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {}, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = {
      email: username,
      password: password,
    };

    axios
      // .post(`${import.meta.env.VITE_BACKEND_URL}/auth/login/`, formData)
      .post(`${import.meta.env.VITE_AUTH_SERVICE_URL}/auth/login/`, formData)
      .then((response) => {
        // localStorage.setItem("access_token", response.data.access);
        // localStorage.setItem("refresh_token", response.data.refresh);

        // localStorage.setItem("user", JSON.stringify(response.data.user));

        console.log("BEFORE DISPATCHING");

        dispatch(
          login({
            access: response.data.access,
            refresh: response.data.refresh,
            user: JSON.stringify(response.data.user),
          })
        );

        console.log("AFTER DISPATCHING");

        // setTimeout(() => {
        //   navigate("/institutes");
        // }, 150000000);

        // console.log("Access Token:", auth.accessToken);
        // console.log("Refresh Token:", auth.refreshToken);

        setError("Successfully logged in");
        setCustomAlert(true);
        setTimeout(() => {
          navigate("/institutes");
        }, 1500);
        // setIsLoggedIn(true);
      })
      .catch((err) => {
        if (err.response?.data?.detail) {
          setError(err.response.data.detail);
        } else {
          setError("Invalid email or password");
        }
        setCustomAlert(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]);
  // };

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
          Login
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
              // borderRadius: "5px",
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
              // borderRadius: "5px",
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
            {loading ? "Logging in..." : "Login"}
          </Button>
          <Typography
            sx={{
              fontSize: "14px",
            }}
          >
            Don't have an account?{" "}
            <Link to="/signup" style={{ textDecoration: "none" }}>
              Signup
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
