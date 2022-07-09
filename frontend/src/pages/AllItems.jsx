import React from "react";
import Items from "../components/Items";
import "./AllItems.scss";

const AllItems = () => {
  return (
    <div className="all-items-page">
      <div className="all-items-section">
        <Items />
      </div>
    </div>
  );
};

export default AllItems;
