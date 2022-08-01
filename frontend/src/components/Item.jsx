import React from "react";
import { useAuth } from "../providers/auth";
import "./Item.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineMessage } from "react-icons/ai";

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
}) => {
  const { user, token, logout } = useAuth();
  let navigate = useNavigate();

  const sendMessage = async (senderId, receiverId) => {
    try {
      await axios.post(
        "http://localhost:4000/api/conversations",
        {
          senderId: senderId,
          receiverId: receiverId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      navigate("/messenger");
    } catch (error) {
      console.log(error);
      logout();
    }
  };

  return (
    <div className="item-page-content">
      <div className="item-page-left-container">
        <img src={coverURL} className="album-cover" alt="album cover" />
      </div>
      <div className="item-page-right-container">
        <h1 style={{ fontSize: albumTitle.length > 20 && "25px" }}>
          {albumTitle}
        </h1>
        <h3 style={{ fontSize: albumTitle.length > 20 && "25px" }}>{artist}</h3>
        <h5>{releaseYear}</h5>
        <div className="type-tag">
          <p>{itemType}</p>
        </div>
        {token && user.userId !== user_id && (
          <div className="send-msg-container">
            <button onClick={() => sendMessage(user.userId, user_id)}>
              Üzenet a hirdetőnek <AiOutlineMessage />
            </button>
          </div>
        )}
        <p className="item-page-subtext">
          Feltöltés dátuma: {dateOfUpdate.slice(0, 10)}
        </p>
        <p className="item-page-subtext">Lemezkiadó: {recordLabel}</p>
        <p className="item-page-subtext">Kiadás helye: {placeOfRelease}</p>
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
