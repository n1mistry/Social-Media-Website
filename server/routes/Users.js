const express = require('express');
const router = express.Router();
const {Users} = require('../models');
const bcrypt = require("bcrypt");
const {validateToken} = require("../middlewares/AuthMiddleware");
const {sign} = require("jsonwebtoken");


router.post("/", async (req, res) =>{
    const { username, password } =req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        });
        res.json("WORKS");
    });
});

router.post('/login', async (req, res) =>{
    const { username, password } = req.body;
    const user =  await Users.findOne({ where: { username } });

    if (!user) res.json({ error: "USER DOESNT EXSIST"});

    if (user)
     bcrypt.compare(password, user.password).then((same) => {
        if (!same)
            res.json({ error: 'Wrong Username and Password combination' });
        else { 
            //res.json('You logged in!!!');
            const accessToken = sign(
                { username: user.username, id: user.id }, "verysecret");
                res.json({token: accessToken, username: username, id: user.id});
        }
    });
});

router.get('/auth', validateToken, (req, res) => {
    res.json(req.user)
})

module.exports = router;

