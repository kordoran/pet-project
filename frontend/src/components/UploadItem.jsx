import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../providers/auth";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import message from "./SlideInMsg";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./UploadItem.scss";

const UploadItem = () => {
  const { token } = useAuth();
  const [myItems, setMyItems] = useState([]);
  const [itemType, setItemType] = useState("Vinyl LP");
  const [artist, setArtist] = useState("");
  const [albumTitle, setAlbumTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [recordLabel, setRecordLabel] = useState("");
  const [placeOfRelease, setPlaceOfRelease] = useState("");
  const [price, setPrice] = useState("");
  const [coverURL, setCoverURL] = useState("");
  const [UPC, setUPC] = useState("");
  const [shippingAvailable, setShippingAvailable] = useState(false);
  const [personalExchangeAvailable, setPersonalExchangeAvailable] =
    useState(false);
  const location = useLocation();

  const theme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: "#ee4c1c",
      },
      secondary: {
        main: "#EE7127",
      },
      background: {
        default: "#ffffff",
      },
    },
    neutral: {
      main: "#fff",
      contrastText: "#fff",
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const item = {
      itemType,
      artist,
      albumTitle,
      releaseYear,
      recordLabel,
      placeOfRelease,
      price,
      coverURL,
      UPC,
      shippingAvailable,
      personalExchangeAvailable,
    };

    try {
      const res = await fetch("http://localhost:4000/api/items", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(item),
      });
      setMyItems([...myItems], res.data);
      setItemType("Vinyl LP");
      setArtist("");
      setAlbumTitle("");
      setReleaseYear("");
      setRecordLabel("");
      setPlaceOfRelease("");
      setPrice("");
      setCoverURL("");
      setUPC("");
      setShippingAvailable(false);
      setPersonalExchangeAvailable(false);
      message(`Sikeres feltöltés!`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="form">
        <h3>Tölts fel új hirdetést!</h3>
        <div className="itemtype-container">
          <InputLabel id="itemtype-select">Termék típusa</InputLabel>
          <Select
            labelId="itemtype-select"
            className="itemtype-select"
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
          >
            <MenuItem value="Vinyl LP">Vinyl LP</MenuItem>
            <MenuItem value="Vinyl_EP">Vinyl EP</MenuItem>
            <MenuItem value="Single">Single (kislemez)</MenuItem>
          </Select>
        </div>
        <TextField
          id="standard-basic"
          label="Előadó neve"
          variant="standard"
          type="text"
          placeholder="pl. Pink Floyd"
          className="newitem-textinput"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Album címe"
          variant="standard"
          type="text"
          placeholder="pl. The Dark Side of The Moon"
          className="newitem-textinput"
          value={albumTitle}
          onChange={(e) => setAlbumTitle(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Kiadás éve"
          variant="standard"
          type="text"
          placeholder="pl. 2002"
          className="newitem-textinput"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Lemezkiadó"
          variant="standard"
          type="text"
          placeholder="pl. RCA Records"
          className="newitem-textinput"
          value={recordLabel}
          onChange={(e) => setRecordLabel(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Kiadás (ország)"
          variant="standard"
          type="text"
          placeholder="pl. USA"
          className="newitem-textinput"
          value={placeOfRelease}
          onChange={(e) => setPlaceOfRelease(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Ár (Ft)"
          variant="standard"
          type="text"
          placeholder="Írja be az összeget (Ft)"
          className="newitem-textinput"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Lemezborító (URL cím)"
          variant="standard"
          type="text"
          placeholder="pl. http://www.sample.com/img.jpg"
          className="newitem-textinput"
          value={coverURL}
          onChange={(e) => setCoverURL(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Vonalkód"
          variant="standard"
          type="text"
          placeholder="pl. 040928407141"
          className="newitem-textinput"
          value={UPC}
          onChange={(e) => setUPC(e.target.value)}
        />
        <div className="shipping-container">
          <InputLabel id="shipping-select">Szállítás elérhető?</InputLabel>
          <Select
            labelId="shipping-select"
            className="shipping-select"
            value={shippingAvailable}
            onChange={(e) => setShippingAvailable(e.target.value)}
          >
            <MenuItem value={true}>Igen</MenuItem>
            <MenuItem value={false}>Nem</MenuItem>
          </Select>
        </div>
        <div className="exchange-container">
          <InputLabel id="personal-exchange">
            Személyes átvétel elérhető?
          </InputLabel>
          <Select
            labelId="personal-exchange"
            className="shipping-container"
            value={personalExchangeAvailable}
            onChange={(e) => setPersonalExchangeAvailable(e.target.value)}
          >
            <MenuItem value={true}>Igen</MenuItem>
            <MenuItem value={false}>Nem</MenuItem>
          </Select>
        </div>
        <button className="send-item-btn" onClick={handleSubmit}>
          Hírdetés feltöltése
        </button>
      </div>
    </ThemeProvider>
  );
};

export default UploadItem;
