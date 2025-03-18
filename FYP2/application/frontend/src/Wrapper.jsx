import React, { useEffect, useState } from "react";

const Wrapper = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("access_token"));
  }, [localStorage]);
  return isLoggedIn ? (
    <div>{children}</div>
  ) : (
    <div>"You are not Logged In"</div>
  );
};

export default Wrapper;
