const router = require("express").Router();
const auth = require("../middlewares/auth");
const Item = require("../models/item");

// get all items

router.get("/", async (req, res) => {
  try {
    const filter = {};
    const allItems = await Item.find(filter);
    res.status(200).json(allItems);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// post new item

router.post("/", auth({ block: true }), async (req, res) => {
  const userId = req.res.locals.user.userId;

  const newItem = new Item({
    user_id: userId,
    itemType: req.body.itemType,
    artist: req.body.artist,
    albumTitle: req.body.albumTitle,
    releaseYear: req.body.releaseYear,
    recordLabel: req.body.recordLabel,
    placeOfRelease: req.body.placeOfRelease,
    price: req.body.price,
    coverURL: req.body.coverURL,
    UPC: req.body.UPC,
    dateOfUpdate: req.body.dateOfUpdate,
    shippingAvailable: req.body.shippingAvailable,
    personalExchangeAvailable: req.body.personalExchangeAvailable,
  });

  try {
    const savedItem = await newItem.save();
    res.status(200).json(savedItem);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// get all items by a user

router.get("/:user_id", auth({ block: true }), async (req, res) => {
  try {
    const myItems = await Item.find({
      user_id: req.params.user_id,
    });
    res.status(200).json(myItems);
    if (!myItems) return res.json("Jelenleg nincs feltöltött lemezed.");
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete one item of a user

router.delete("/delete/:id", auth({ block: true }), async (req, res) => {
  try {
    const id = req.params.id;
    await Item.findByIdAndRemove(id).exec();
    res.status(200).json("");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
