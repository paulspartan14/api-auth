const router = require('express').Router();
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/users');

// validation for register
const schemaRegister = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().min(6).max(100).required().email(),
    password: Joi.string().min(6).max(100).required()
})

// Route register
router.post('/register', async(req, res) => {

    // validations 
    const { error } = schemaRegister.validate(req.body)
    if (error)return res.status(400).json({error: error.details[0].message})

    // email exist
    const emailExist = await User.findOne({email: req.body.email})
    if (emailExist) return res.status(400).json({error: true, message: 'email registered'})

    // bcrypt password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    })

    try{
        const savedDB = await user.save();
        res.json({
            error: null,
            data: savedDB
        })
    } catch (err) {
        res.status(400).json({err})
    }
});

module.exports = router;