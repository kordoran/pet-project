const logger = require("../utils/logger")

const errorhandler = (err, req, res, next) => {
    //console.log(err);
    logger.error(new Error("render error"), err.toString());
    res.status(500).json("middleware-nél error");
}

module.exports = errorhandler;