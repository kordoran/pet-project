import React from "react";
import { useAuth } from "../providers/auth";

const Home = () => {
  const { auth, token } = useAuth();

  return (
    <>
      <div>Home</div>
      <p>{token ? "Logged in" : "Anonymous"}</p>

      {token ? "Welcome" : <button onClick={auth}>Login with Google</button>}
    </>
  );
};

export default Home;
