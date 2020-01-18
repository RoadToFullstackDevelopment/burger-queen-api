const express = require('express');
const router = express.Router();
const User = require('../../models/user.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('/', async (req, res, next) => {
  try {
      const users = await User.find()
      res.json(users)
  } catch (err) {
      res.status(500).json({ message: err.message })
  }
});
  
router.post('/register', (req, res, next) => {
  User.find({email: req.body.email})
  .exec()
  .then(user => {
    if (user.length >= 1) {
      return res.status(409).json({
        message: 'This email exists!'
      })
    } 
    else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err
          })
        }
        else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
            kitchen: req.body.kitchen,
            salon: req.body.salon
          })
          user
          .save()
          .then(result => {
            console.log(result)
            res.status(201).json({message: 'User created!'})
          })
          .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
          });
        }
      })
    }
  })
}); 

router.post('/login', (req, res, next) => {
  User.find({email: req.body.email})
  .exec()
  .then(users => {
    if (users.length < 1){
      return res.status(401).json({
        message: 'This authentication has failed!'
      })
    }
    bcrypt.compare(req.body.password, users[0].password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: 'This authentication has failed!'
        })
      }
      if (result) {
        const token = jwt.sign({
          email: users[0].email,
          usersId: users[0]._id
        }, 
        process.env.JWT_KEY,
          {
            expiresIn: '1h'
          }

        )
        return res.status(200).json(
          {
            message: 'This authentication has succeed!',
            token: token
          })
      }
      res.status(401).json({
        message: 'This authentication has failed!'
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err})
  });
})
  
  
  router.get('/:uid', (req, res, next) => {
    res.status(201).json({
        message: 'This is a special ID',
        uid: req.params.uid
      })
  });
  
  router.put('/:uid', (req, res, next) => {
    res.status(200).json({
      message: 'This user was updated',
      uid: req.params.uid
    })
  });
  
  router.delete('/:uid', (req, res, next) => {
    User.deleteOne({_id: req.params.uid})
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'User deleted!'
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: err})
    });
  });

module.exports = router;