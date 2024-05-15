const jwt = require("jsonwebtoken");

const tokenSing = async (user) => {
    const sing = await jwt.sing(
        {
            _id: user._id,
            role: user.role,
        },
        JWT_SECRET,
        {
            expires: "2h",
        }
    );
    return sing;
};

const verifyToken = async () => {

};

module.exports = { tokenSing, verifyToken };