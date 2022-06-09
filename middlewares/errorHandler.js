const errorHandler = (err, req, res, next) => {
    if (err.message) {
        res.status(500).send(err.message);
    } else {
        res.status(500).send("There was a server side error");
    }
};
module.exports = errorHandler;
