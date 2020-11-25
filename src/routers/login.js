const router = require('express').Router();
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');

const User = require('../models/users');


// validation for login
const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(100).required().email(),
    password: Joi.string().min(6).max(100).required()
});

// Route login
router.post('/login', async (req, res) =>{
    // validations 
    const { error } = schemaLogin.validate(req.body)
    if (error) return res.status(400).json({error: error.details[0].message})

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ error: true, message: 'email not registered' })

    const validatePassword = await bcrypt.compare(req.body.password, user.password);
    if (!validatePassword) return res.status(400).json({ error: true, message: 'password invalid' })
    
    // create token
    const token = jwt.sign({
        name: user.name,
        id: user._id,
    }, process.env.TOKEN_SECRET)

    res.header('auth-token', token).json({
        error: null,
        data: {token}
    })
});

module.exports = router;