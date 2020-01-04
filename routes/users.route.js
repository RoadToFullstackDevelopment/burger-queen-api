const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.get('/', authenticateToken, (req, res) => {
  res.json(users.filter(user => user.email === req.user.email))
})

router.post('/', async (req, res) => {
  try {
    const user = new User({
    email: req.body.email,
    password: req.body.password,
    kitchen: req.body.kitchen,
    salon: req.body.salon
  })
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

router.get('/:uid', getUser, async (req, res) => {
    res.json(res.user)
});

router.put('/:uid', getUser, async (req, res) => {
    if (req.body.email !== null) {
      res.user.email = req.body.email
    }
  
    if (req.body.password !== null) {
      res.user.password = req.body.password
    }
    try {
      const updatedUser = await res.user.save()
      res.json(updatedUser)
    } catch {
      res.status(400).json({ message: err.message })
    }
  
});

router.delete('/:uid', getUser, async (req, res) => {
    try {
      await res.user.remove()
      res.json({ message: 'Deleted This User' })
    } catch(err) {
      res.status(500).json({ message: err.message })
    }
});

async function getUser (req, res, next) {
    let user
    try {
      user = await User.findById(req.params.uid)
      if (user == null) {
        return res.status(404).json({ message: 'Cant find user'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
  
    res.user = user
    next()
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token === null) {
    return res.sendStatus(401)
  }
  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, function (err, user) {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user
    next()
  })
}

module.exports = router;