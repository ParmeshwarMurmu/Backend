const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = (req, res, next) => {

    const token = req.headers.authorization.split(" ")[1]

    try {

        if (token) {
            jwt.verify(token, process.env.secretKey,  (err, decoded)=> {
                
                if(decoded){
                    // console.log(decoded);
                    req.body.userID = decoded.userID
                    req.body.userName = decoded.userName
                    next()
                }
                else{
                    res.status(200).send({ "err": err })
                }
            });

        }
        else {
            res.status(400).send({ "msg": "Please Login Again" })
        }

    } catch (error) {

        res.status(400).send({ "msg": "Please Login", "err": error })
    }
}

module.exports={
    auth
}