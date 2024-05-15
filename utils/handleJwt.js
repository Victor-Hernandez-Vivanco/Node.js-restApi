const jwt = require("jsonwebtoken");


const tokenSign = async (user, JWT_SECRET) => {
    const sign =  jwt.sign(
        {
            _id: user._id,
            role: user.role,
        },
        JWT_SECRET,
        {
            expiresIn: "2h",
        }
    );
    
    return sign;
};

const verifyToken = async (tokenJwt, JWT_SECRET) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    } catch (error) {
        console.log(error)
        return null
       
    }
};

module.exports = { tokenSign, verifyToken };