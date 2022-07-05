import React, { useState, useEffect } from "react";
import { useAuth } from "../providers/auth";
import axios from "axios";
import "./GetMyItems.scss";

const GetMyItems = () => {
  const { user } = useAuth();
  const [myItems, setMyItems] = useState([]);

  useEffect(() => {
    const getMyItems = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/items/" + user.userId
        );
        setMyItems(res.data);
        console.log(myItems);
      } catch (error) {
        console.log(error);
      }
    };
    getMyItems();
  }, []);

  return (
    <section className="my-items">
      <h2>Saját feltöltéseim</h2>
      <div className="my-items-container">
        {myItems.map((item) => (
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
      </div>
    </section>
  );
};

export default GetMyItems;
