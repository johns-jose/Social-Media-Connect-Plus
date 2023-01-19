const jwt = require('jsonwebtoken')

//jwt token verification
function verifyAdminToken(req, res, next) {
    let authHeader = req.headers.authorization;
    console.log('authHeader:', req.headers);
    if (authHeader == undefined) {
        res.status(401).json({ error: 'Account verification failed' })
    } else {
        console.log('1');
        // let Token = authHeader.split(" ")[1]
        // console.log('2', Token);
        jwt.verify(authHeader, "abcd1234", function (err, decoded) {
            if (err) {
                console.log('err', err);
                res.status(500).json({ error: 'Authentication failed' })

            } else {
                console.log("success");
                next()
            }
        })
    }

}

module.exports = { verifyAdminToken }