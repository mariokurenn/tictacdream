import React, { useState } from "react";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";

const MainComponent = () => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <div>
      {loggedIn ? (
        <LogoutButton setLoggedIn={setLoggedIn} />
      ) : (
        <p>Niste prijavljeni. <Link to="/login">Prijavite se</Link>.</p>
      )}
    </div>
  );
};

export default MainComponent;
