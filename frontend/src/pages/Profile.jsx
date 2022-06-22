import React from "react";
import { useAuth } from "../providers/auth";

const Profile = () => {
  /*  const { counter, increment, decrement } = useCounter("Profile");
  const { value, increment: goUp, decrement: goDown } = useGlobalCounter();
  */
  const { token } = useAuth();

  return (
    <>
      <div>Profile</div>
      <p>{token ? "Logged in" : "Anonymous"}</p>
      {/*<button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <p>Value: {counter}</p>
      <button onClick={goUp}>+</button>
      <button onClick={goDown}>-</button>
      <p>Value: {value}</p>
      */}
    </>
  );
};

export default Profile;
