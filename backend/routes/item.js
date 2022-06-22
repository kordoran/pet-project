const router = require("express").Router();
const auth = require("../middlewares/auth");
const User = require("../models/user");

router.get("/", auth({ block: true }), async (req, res) => {
  const user = await User.findById(res.locals.user.userId);
  res.json({ user });
  /*
        needs auth middleware
        find user with userid from res.locals.userid
        get all dashboards for user
    */
});

/*
router.get('/:id', (req, res) => {
        //send :id dashboard details
})

router.get('/:id/todos', (req, res) => {    
        //get all todos from :id dashboard
})
*/

router.get("/:id/items/:itemid", (req, res) => {
  /*
        
    */
});

router.post("/", (req, res) => {
  /*
        create dashboard for a user, send created id
    */
});

router.post("/:id/items", (req, res) => {
  /*
        create item for a user, send created itemid
    */
});

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
