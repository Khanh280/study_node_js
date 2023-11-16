const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRETKEY;
const User = require('../app/models/User')
const middleware = {
    verifyToken: (req, res, next) => {
        const token = req.cookies.token
        const generateAuthTokenResponse = jwt.decode(token, secretKey)
        // console.log(generateAuthTokenResponse)
        // console.log(req.originalUrl)
        if (token === undefined) {
            res.redirect('/login')
        } else {
            next();
        }
    },
    roleAdmin: (req, res, next) => {
        const token = req.cookies.token
        const generateAuthTokenResponse = jwt.decode(token, secretKey)
        // console.log(generateAuthTokenResponse)
        // console.log(req.originalUrl)
        if (token === undefined) {
            res.redirect('/login')
        } else {
            const decode = jwt.verify(token, secretKey)
            User.findOne({username: decode.username})
                .populate('role')
                .exec()
                .then(user => {
                    if (user.role.name === "ROLE_ADMIN") {
                        next();
                    } else {
                        res.render('403', {
                            statusLogin: req.cookies.token ? true : false,
                            username: decode.username
                        })
                        // res.status(403).send('Khong co quyen su dung chuc nang nay')
                    }
                })
                .catch(() => {
                })

        }
    }
}
module.exports = middleware;