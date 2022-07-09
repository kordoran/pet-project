const router = require("express").Router();
const http = require("../utils/http");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const config = require("../app.config");

router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { currentCity, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", auth({ block: false }), async (req, res) => {
  const payload = req.body;
  if (!payload) return res.sendStatus(400);

  const code = payload.code;
  const provider = payload.provider;

  if (!code || !provider) return res.sendStatus(400);

  if (!Object.keys(config.auth).includes(provider)) return res.sendStatus(400);

  const response = await http.post(
    config.auth[provider].token_endpoint,
    {
      code: code,
      client_id: config.auth[provider].client_id,
      client_secret: config.auth[provider].client_secret,
      redirect_uri: config.auth[provider].redirect_uri,
      grant_type: config.auth[provider].grant_type,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response) return res.sendStatus(500);
  if (response.status !== 200) return res.sendStatus(401);

  let openId;
  const onlyOauth = !response.data.id_token;
  if (onlyOauth) {
    let accesstoken = response.data.access_token;
    console.log(accesstoken);

    const userResponse = await http.get(config.auth[provider].user_endpoint, {
      headers: {
        authorization: "Bearer " + accesstoken,
      },
    });

    if (!userResponse) return res.sendStatus(500);
    if (userResponse.status !== 200) return res.sendStatus(401);
    const id = config.auth[provider].user_id;
    openId = userResponse.data[id];
  } else {
    const decoded = jwt.decode(response.data.id_token);
    if (!decoded) return res.sendStatus(500);
    openId = decoded.sub;
  }

  const key = "providers." + provider;
  /*ha nem akarnánk mergelni
        let user = await User.findOneAndUpdate({
        [key]: openId,
    }, {
        providers: {
            [provider]: openId,
        },
    }, { new: true, upsert: true });
    */

  let user = await User.findOne({ [key]: openId });

  if (user && res.locals.user?.providers) {
    user.providers = { ...user.providers, ...res.locals.user.providers };
    user = await user.save();
  }
  /* user, user._id : null = user?._id optional chaining */

  const token = jwt.sign(
    {
      userId: user?._id,
      providers: user ? user.providers : { [provider]: openId },
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

router.post("/create", auth({ block: true }), async (req, res) => {
  if (!req.body?.username) return res.sendStatus(400);

  try {
    const newUser = new User({
      username: req.body.username,
      providers: res.locals.user.providers,
      currentCity: req.body.currentCity,
    });
    const user = await newUser.save();

    const token = jwt.sign(
      { userId: user._id, providers: user.providers },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.log("error in saving new user: ", error);
    res.sendStatus(500);
    return;
  }
});

module.exports = router;
