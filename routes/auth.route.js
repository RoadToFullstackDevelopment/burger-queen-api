const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();


router.post('/', async (req, res) => {
    const useremail = req.body.useremail
    const user = {email: useremail}
    const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN)
    res.status(200).json({accessToken: accessToken})
});

module.exports = router;