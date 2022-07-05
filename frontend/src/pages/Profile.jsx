import React from "react";
import UploadItem from "../components/UploadItem";
import GetMyItems from "../components/GetMyItems";
import "./Profile.scss";

const Profile = () => {
  return (
    <div className="profile">
      <h2>Profilom</h2>
      <UploadItem />
      <GetMyItems />
    </div>
  );
};

export default Profile;
