import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Item from "./Item";
import "./Items.scss";
import axios from "axios";

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

  /*   const characterClickHandler = (e) => {
    console.log(e.target);
    setCharacterShow(!characterShow)
    console.log(characterShow);
  } */

  return items === [] ? (
    <div>Loading...</div>
  ) : (
    <div className="items-all">
      {/*       <PaginationControlled
        val={page}
        page={page}
        onChange={handlePageChange}
        pageCount={42}
      /> */}
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
          {/*  <button onClick={(e) => showMoreInfo(e, character.id)}>Show more!</button> */}
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
      {/*       <PaginationControlled
        val={page}
        page={page}
        onChange={handlePageChange}
        pageCount={42}
      /> */}
    </div>
  );
};

export default Items;
