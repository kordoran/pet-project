import React from "react";
import axios from "axios";
import { useAuth } from "../providers/auth";
import UploadItem from "../components/UploadItem";
import GetMyItems from "../components/GetMyItems";
import "./Profile.scss";

const Profile = () => {
  const { user } = useAuth();
  // useEffect(() => {
  const getUser = async () => {
    try {
      const res = await axios(
        "http://localhost:4000/api/user?userId=" + user.userId
      );
      const username = res.data.username;
      localStorage.setItem("username", username);
    } catch (error) {
      console.log(error);
    }
  };
  getUser();
  //  }, []);

  return (
    <div className="profile">
      <header className="profile-header">
        <h2>Profil {localStorage.getItem("username")}</h2>
      </header>
      <UploadItem />
      <GetMyItems />
    </div>
  );
};

export default Profile;
