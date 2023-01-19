const jwt = require('jsonwebtoken')

//jwt token verification
function verifyUserToken(req, res, next) {
    let authHeader = req.headers.token;
    console.log('authHeader:', req.headers.token  );
    if (authHeader == undefined) {
        res.status(401).json({ error: 'Account verification failed' })
    }
    console.log('1');
    let Token = authHeader.split(" ")[1]
    console.log('2', Token);
    jwt.verify(Token, "ABCD1234", function(err, decoded){
        if (err) {
            console.log('err',err);
            res.status(500).json({ error: 'Authentication failed' })

        } else {
            console.log("success");
            next()
        }
    })

}

module.exports = {verifyUserToken}