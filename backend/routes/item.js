const router = require("express").Router();
const auth = require("../middlewares/auth");
const Item = require("../models/item");

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

/*
router.get('/:id', (req, res) => {
        //send :id dashboard details
})

router.get('/:id/todos', (req, res) => {    
        //get all todos from :id dashboard
})
*/

/* router.get("/:id/items/:itemid", (req, res) => {
  
        
    
});

router.post("/", (req, res) => {
  
        create dashboard for a user, send created id
   
}); */

/* router.post("/item/:id", auth({ block: true }), async (req, res) => {
  if (!req.body?.username) return res.sendStatus(400);
  const newItem = new Item(req.body);

  try {
    const savedItem = await newItem.save();
    res.status(200).json(savedItem);
  } catch (error) {
    res.status(500).json(error);
  }
}); */

router.post("/", auth({ block: true }), async (req, res) => {
  //  console.log("request: ", req);
  const userId = req.res.locals.user.userId;
  const username = req.res.locals.user.username;

  const newItem = new Item({
    user_id: userId,
    username: username,
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
    /* await User.findByIdAndUpdate("62b45b1d5c1b8c28ee35049c", {
      items: [newItem],
    });
    res.status(200).json(newItem); */
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }

  /*   const token = jwt.sign(
    { userId: user._id, providers: user.providers },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  ); */
});

router.get("/:user_id", async (req, res) => {
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

/* router.post("/:id/items", (req, res) => {
  
        // create item for a user, send created itemid
   
}); */

router.patch("/:id", (req, res) => {
  /*
        update existing dashboard
    */
});

router.patch("/:id/items/:itemid", (req, res) => {
  /*
        update existing todo
    */
});

router.delete("/:id", (req, res) => {
  /*
        delete existing dashboard
    */
});

router.delete("/:id/items/:itemid", (req, res) => {
  /*
        delete existing item
    */
});

module.exports = router;
