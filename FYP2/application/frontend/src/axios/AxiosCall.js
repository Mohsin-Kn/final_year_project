import axios from "axios";
import { store } from "../redux/store";
import { refreshAccessToken, logout } from "../redux/slices/authSlice";

// const AxiosCall = axios.create({
//   baseURL: import.meta.env.AUTH_SERVICE_URL,
// });
const AxiosCall = axios.create();

// Request interceptor to add access token
AxiosCall.interceptors.request.use((config) => {
  // const { auth } = store.getState();
  // if (auth.accessToken) {
  //   config.headers.Authorization = `Bearer ${auth.accessToken}`;
  // }
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor to handle token expiration
AxiosCall.interceptors.response.use(
  (response) => response,
  async (error) => {
    // if (error.response?.status === 401) {
    //   const { auth } = store.getState();
    //   if (auth.refreshToken) {
    //     // Make an API call to the token_refresh endpoint
    //     const result = await axios.post(
    //       `${import.meta.env.VITE_BACKEND_URL}/login/refresh/`,
    //       {
    //         refresh: auth.refreshToken,
    //       }
    //     );
    //     if (result.data.access) {
    //       error.config.headers.Authorization = `Bearer ${result.data.access}`;
    //       return axios(error.config); // Retry the failed request
    //     } else {
    //       store.dispatch(logout()); // Logout if refresh fails
    //     }
    //   }
    // }
    if (error.response?.status === 401) {
      // const { auth } = store.getState();
      // if (auth.refreshToken) {
      //   const result = await store.dispatch(
      //     refreshAccessToken(auth.refreshToken)
      //   );
      //   if (result.payload?.access) {
      //     error.config.headers.Authorization = `Bearer ${result.payload.access}`;
      //     return axios(error.config); // Retry the failed request
      //   } else {
      //     store.dispatch(logout()); // Logout if refresh fails
      //   }
      // }
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        const result = await store.dispatch(refreshAccessToken(refreshToken));
        if (result.payload?.access) {
          error.config.headers.Authorization = `Bearer ${result.payload.access}`;
          return axios(error.config); // Retry the failed request
        } else {
          store.dispatch(logout()); // Logout if refresh fails
        }
      }
    }
    return Promise.reject(error);
  }
);

export default AxiosCall;
