import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import Item from "./Item";
import "./Items.scss";

const Items = () => {
  const [items, setItems] = useState([]);

  const [itemShow, setItemShow] = useState(false);

  useEffect(() => {
    const getAllItems = async () => {
      const resp = await axios.get("http://localhost:4000/api/items/");
      setItems(resp.data);
    };
    getAllItems();
  }, []);

  const showMoreInfo = (e, id) => {
    if (e.target) {
      setItemShow(id === itemShow ? null : id);
    }
  };

  const sortDateDescending = () => {
    const sortedByDateDescending = [...items].sort((a, b) => {
      return new Date(b.dateOfUpdate) - new Date(a.dateOfUpdate);
    });
    setItems(sortedByDateDescending);
  };

  const sortDateAscending = () => {
    const sortedByDateAscending = [...items].sort((a, b) => {
      return new Date(a.dateOfUpdate) - new Date(b.dateOfUpdate);
    });
    setItems(sortedByDateAscending);
  };

  const sortPriceDescending = () => {
    const sortedByPriceDescending = [...items].sort(
      (a, b) => parseFloat(b.price) - parseFloat(a.price)
    );
    setItems(sortedByPriceDescending);
  };

  const sortPriceAscending = () => {
    const sortedByPriceAscending = [...items].sort(
      (a, b) => parseFloat(a.price) - parseFloat(b.price)
    );
    setItems(sortedByPriceAscending);
  };

  return items === [] ? (
    <div>Loading...</div>
  ) : (
    <>
      <div className="search-container">
        <div className="sort-container">
          <button className="price-ascending" onClick={sortPriceAscending}>
            Ár szerint (növekvő)
          </button>
          <button className="price-descending" onClick={sortPriceDescending}>
            Ár szerint (csökkenő)
          </button>
          <button className="date-ascending" onClick={sortDateAscending}>
            Feltöltés dátuma (legrégibbtől)
          </button>
          <button className="date-descending" onClick={sortDateDescending}>
            Feltöltés dátuma (legújabbtól)
          </button>
        </div>
      </div>
      <div className="items-all">
        {items.map((item) => (
          <div className="item" key={item._id} id={item._id}>
            <div className="card">
              <div className="card-content">
                <div className="card-content-top">
                  <img
                    src={item.coverURL}
                    className="album-cover-img"
                    onClick={(e) => showMoreInfo(e, item._id)}
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
            {itemShow === item._id ? (
              <div className="item-page">
                <AiOutlineClose
                  onClick={(e) => showMoreInfo(e, item._id)}
                  id="close-icon"
                />
                <Item
                  user_id={item.user_id}
                  itemType={item.itemType}
                  artist={item.artist}
                  albumTitle={item.albumTitle}
                  releaseYear={item.releaseYear}
                  recordLabel={item.recordLabel}
                  placeOfRelease={item.placeOfRelease}
                  price={item.price}
                  coverURL={item.coverURL}
                  UPC={item.UPC}
                  dateOfUpdate={item.dateOfUpdate}
                  shippingAvailable={item.shippingAvailable}
                  personalExchangeAvailable={item.personalExchangeAvailable}
                  isFrozen={item.isFrozen}
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
};

export default Items;
