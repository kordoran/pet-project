import React, { useEffect, useState } from "react";
import "./Item.scss";
import axios from "axios";

const Item = ({
  user_id,
  itemType,
  artist,
  albumTitle,
  releaseYear,
  recordLabel,
  placeOfRelease,
  price,
  coverURL,
  UPC,
  dateOfUpdate,
  shippingAvailable,
  personalExchangeAvailable,
  isFrozen,
}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getAllItems = async () => {
      const resp = await axios.get("http://localhost:4000/api/items/");
      setItems(resp.data);
    };
    getAllItems();
  }, []);

  return (
    <div className="item-page-content">
      <div className="item-page-left-container">
        <img src={coverURL} className="album-cover" alt="album cover" />
        {isFrozen && <div className="frozen">Jegelve</div>}
      </div>
      <div className="item-page-right-container">
        <h1>{albumTitle}</h1>
        <h3>{artist}</h3>
        <h5>{releaseYear}</h5>
        <div className="type-tag">
          <p>{itemType}</p>
        </div>
        <p className="item-page-subtext">Feltöltötte: {user_id}</p>
        <p className="item-page-subtext">
          Feltöltés dátuma: {dateOfUpdate.slice(0, 10)}
        </p>
        <p className="item-page-subtext">Lemezkiadó: {recordLabel}</p>
        <p className="item-page-subtext">Kiadás (ország): {placeOfRelease}</p>
        <p className="item-page-subtext">Vonalkód: {UPC}</p>
        <p className="price-text">{price} Ft</p>
        <div className="isavailable-tiles">
          {shippingAvailable ? (
            <div className="available-box">Házhozszállítás elérhető</div>
          ) : (
            <div className="unavailable-box">Házhozszállítás nem elérhető</div>
          )}
          {personalExchangeAvailable ? (
            <div className="available-box">Személyes átvétel lehetséges</div>
          ) : (
            <div className="unavailable-box">
              Személyes átvétel nem lehetséges
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;
