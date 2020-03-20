const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
         
        //const bearerHeader = req.headers['authorization'];
        //console.log(JSON.stringify(req.headers));
        //console.log(req.headers.authorization);
        const bearerToken = req.headers.authorization;
        const decoded = jwt.verify(bearerToken, process.env.JWT_KEY);
        req.userData = decoded;

        //var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['Authorization'] || req.headers['authorization'];
        //const decoded = jwt.verify(token, process.env.JWT_KEY)
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
     
}