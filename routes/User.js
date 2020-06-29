const {Router} = require('express')
const User = require('../models/User')
const Todo = require('../models/Todo')
const JWT = require('jsonwebtoken')
const passport = require('passport')
const passportConfig = require('../passport')

const router = Router()

router.post('/register', (req, res) => {
    const {username, password, role} = req.body
    console.log(req.body)
    // User.findOne({username}, (err, foundUser) => {
    //     if (err)
    //         return res.status(500).json({message: {msgBody: "Server error", msgError: true}})
    //     if (foundUser)
    //         return res.status(400).json({message: {msgBody: "Username is already taken", msgError: true}})
    //     const newUser = new User({username, password, role})
    //     newUser.save((err, user) => {
    //         if (err)
    //             return res.status(500).json({message: {msgBody: "Server error", msgError: true}})
    //         return res.status(201).json({message: {msgBody: "Account successfully created", msgError: true}})
    //     })
    // })
})
router.get('/test', (req,res) => {
    res.send('works')
})
module.exports=router