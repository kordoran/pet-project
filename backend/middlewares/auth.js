const jwt = require("jsonwebtoken");

const auth = (middlewareParams) => (req, res, next) => {
    //console.log("authenticating... ");

    const token = req.header("authorization");
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (middlewareParams.block && error) return res.sendStatus(401);
        res.locals.user = user;
        next();

    });


};

module.exports = auth;