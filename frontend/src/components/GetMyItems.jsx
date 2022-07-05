import React, { useState, useEffect } from "react";
import { useAuth } from "../providers/auth";
import axios from "axios";
import "./GetMyItems.scss";
import { ImBin2 } from "react-icons/im";

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
      } catch (error) {
        console.log(error);
      }
    };
    getMyItems();
  }, []);

  const deleteItem = (id) => {
    axios.delete(`http://localhost:4000/api/items/delete/${id}`).then(() => {
      setMyItems(
        myItems.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  console.log(myItems);

  return (
    <section className="my-items">
      <h2>Saját feltöltéseim</h2>
      <div className="my-items-container">
        {myItems === [] ? (
          <p>Nincs saját feltöltésed.</p>
        ) : (
          myItems.map((item) => (
            <div className="item" key={item._id} id={item._id}>
              <div className="card">
                <div className="card-content">
                  <div
                    className="card-content-top"
                    onClick={() => deleteItem(item._id)}
                  >
                    <img
                      src={item.coverURL}
                      className="album-cover-img"
                      alt="album cover"
                    />
                    <ImBin2 className="bin-icon" />
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
          ))
        )}
      </div>
    </section>
  );
};

export default GetMyItems;
