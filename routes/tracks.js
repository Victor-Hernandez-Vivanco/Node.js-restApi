const express = require("express");
const router = express.Router();

// http://localhost/tracks [GET, POST, PUT, DELETE]

router.get("/", (req, res) => {
    const data =  ["Hola ", "mundo"] 

    res.send({data})
})

module.exports = router
