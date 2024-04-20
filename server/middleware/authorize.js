const jwt = require("jsonwebtoken")
require("dotenv").config()

const authorizeUser = async (req, res, next) => {
    try {
        const jwtToken = req.header("token")
        if(!jwtToken){
            return res.status(403).json("Not Authorized")
        }
        const verify = jwt.verify(jwtToken, process.env.jwtSecret)
        req.user = verify
        next()
    } catch (error) {
        res.status(403).json(error.message)
    }
}

module.exports = {authorizeUser}