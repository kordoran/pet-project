import React, { useState, useEffect } from "react";
import axios from "axios";

const RecentUploads = () => {
  const [recentUpdates, setRecentUpdates] = useState([]);

  useEffect(() => {
    const getRecentUploads = async () => {
      const resp = await axios.get("http://localhost:4000/api/items/");
      const sortedUploads = [...resp.data].sort((a, b) => {
        return new Date(b.dateOfUpdate) - new Date(a.dateOfUpdate);
      });
      const sortedRecentUploads = sortedUploads.slice(0, 4);
      setRecentUpdates(sortedRecentUploads);
    };
    getRecentUploads();
  }, []);

  return (
    <section className="latest-updates">
      {recentUpdates.map((item) => (
        <div className="item" key={item._id} id={item._id}>
          <div className="card">
            <div className="card-content">
              <div className="card-content-top">
                <img
                  src={item.coverURL}
                  className="album-cover-img"
                  alt="album cover"
                />
                <div className="item-type-tag">{item.itemType}</div>
                <p className="album-title-text">{item.albumTitle}</p>
                <p className="album-artist-text">{item.artist}</p>
              </div>
              <div className="card-content-bottom">
                <div className="cc-bottom-left">
                  <p className="uploader-name-text">{item.user_id}</p>
                  <p className="upload-date-text">
                    {item.dateOfUpdate.slice(0, 10)}
                  </p>
                </div>
                <p className="price-text">{item.price} Ft</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default RecentUploads;
