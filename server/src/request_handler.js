const TOKEN_WL = /(register|login)/;

async function requestHandler(req, res, next) {
    res.setHeader('Content-Type', 'application/json')
    if (req.method == 'OPTIONS' || TOKEN_WL.test(req.path)) {
        next();
        return;
    }
    next();
}

module.exports = requestHandler;
