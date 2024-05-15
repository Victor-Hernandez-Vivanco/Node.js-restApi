const customheder = (req, res, next) => {
    try {
        const api_key = req.headers.api_key;
        if (api_key === "a:1") {
            
        }
        console.log(req.headers)
        next();
    } catch (error) {
        res.status(403)
        res.send({error: "ALGO OCURRIO EN EL CUSTOMHEADER"})
    }
}

module.exports = customheder