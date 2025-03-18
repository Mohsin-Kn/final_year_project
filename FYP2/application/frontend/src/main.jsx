import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// import './index.css'
import "./styles/index.css";
import { ThemeProvider } from "@mui/material";
import theme from "./Theme";
import Wrapper from "./Wrapper.jsx";

import { store } from "./redux/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      {/* <Wrapper> */}
      <Provider store={store}>
        <App />
      </Provider>
      {/* </Wrapper> */}
    </ThemeProvider>
  </StrictMode>
);
