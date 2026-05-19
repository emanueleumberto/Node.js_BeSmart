function errorHandler(err, req, res, next) {
    const e = err.toString();
    console.log("Sono il middleware errorHandler! Err: ", e);
    res.status(500).json({message: e})
}

function pageNotFoundHandler(req, res, next) {
    console.log("page Not Found!!");
    res.status(404).json({message: "page Not Found!!"})
}

module.exports = {errorHandler,pageNotFoundHandler }