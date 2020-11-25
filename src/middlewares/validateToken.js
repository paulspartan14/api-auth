const jwt = require('jsonwebtoken');

// middleware to validate token (protected routes)
const verifyToken = (req, res, next)=>{
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ error: true, message: 'access no permited' })
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (err) {
        res.status(400).json({error: true, message: 'token invalid' });
    }
}

module.exports = verifyToken;