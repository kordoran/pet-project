import React from "react";
import UploadItem from "../components/UploadItem";
import GetMyItems from "../components/GetMyItems";
import "./Profile.scss";

const Profile = () => {
  return (
    <div className="profile">
      <header className="profile-header">
        <h2>Profilom</h2>
      </header>
      <UploadItem />
      <GetMyItems />
    </div>
  );
};

export default Profile;
