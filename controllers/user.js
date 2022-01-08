const User = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const schemaRegister = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    username: Joi.string().min(4).max(255).required(),
    password:  Joi.string().min(8).max(1024).required(),
})

const schemaLogin = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    username: Joi.string().min(4).max(255).required(),
    password: Joi.string().min(8).max(1024).required()
})

var controllerUser = {

    registerUser: async (req,res) => {
        const {error} = schemaRegister.validate(req.body);

        if(error) return res.status(400).json({error: error.details[0].message});

        const exisName = await User.findOne({name: req.body.name});

        if(exisName) return res.status(400).json({error:true, message: "La persona ya tiene cuenta"});

        const exisusername = await User.findOne({username: req.body.username});

        if(exisusername) return res.status(400).json({error:true, message: "El usuario ya existe"});

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            username: req.body.username,
            password: password
        })
        try {
            const  userDB = await user.save();

            res.json({
                error: null,
                data: userDB
            })
        }   
        catch (error) {
            res.status(400).json(error)
        }
    },

    loginUser: async (req,res) => {
        const user = await User.findOne({ username: req.body.username});
        if(!user) return res.status(400).json({ error:true, message:"Credenciales no validas"});

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).json({ error: true, message:"Credenciales no validas"});

        const {error} = schemaLogin.validate(req.body);
        if(error) return res.status(400).json({ error: error.details[0].message })

        const token = jwt.sign({
            username: user.username,
            id: user._id
        }, process.env.TOKEN_SECRET)

        res.header('auth-token',token).json({
            user: user.name,
            token
        })
    }
}

module.exports = controllerUser;