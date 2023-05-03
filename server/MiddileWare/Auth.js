
const jwt = require("jsonwebtoken")
const jwtKey = process.env.REACT_JWT_KEY
const verifyToken = (req, res, next) => {
    console.warn(req.headers["authorization"]);
    let token = req.headers["authorization"]
    if (token) {
        token.split(" ")[1];
        jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                res.status(401).send({
                    result: "please provide b token"
                })
            } else {
                next()
            }
        })
    } else {
        res.status(401).send({
            result: "please provide a token"
        })
    }

}
module.exports = verifyToken;