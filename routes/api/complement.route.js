const express = require('express');
const router = express.Router();
const Complement = require('../../models/complement.model');
const mongoose = require('mongoose');
const auth = require('../auth');


router.get('/', async (req, res, next) => {
    try {
        const complements = await Complement.find().select('name price complement _id')
        res.json(complements)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
  });

router.post('/', auth, (req, res, next) => {
    const complement = new Complement ({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      complement: req.body.complement
    })
    complement
    .save()
    .then(result => {
      console.log(result)
      res.status(201).json({
        message: 'This complement has been created',
        createdProduct: {
          _id: result._id,
          name: result.name,
          price: result.price,
          complement: result.complement,
          request: {
            type: 'GET',
            url: `http://localhost:5000/api/complement/${result._id}`
          }
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
  });

  router.get('/:complementid', auth, (req, res, next) => {
    const id = req.params.complementid
    Complement.findById(id)
    .select('name price complement _id')
    .exec()
    .then(doc => {
      console.log(doc)
      if (doc) {
        res.status(200).json({
          complement: doc,
          request: {
            type: 'GET',
            url: `http://localhost:5000/api/complement`
          }
        })
      }
      else {
        res.status(404).json({message: 'No valid entry found for provided ID'})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: err})
    });
});

router.put('/:complementid', auth, (req, res, next) => {
  const id = req.params.complementid
  const updateOps = {}
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value
  }
  Complement.update({_id: id}, {$set: updateOps})
  .exec()
  .then(result => {
    console.log(result)
    res.status(200).json({
      message: 'Complement updated',
      request: {
        type: 'GET',
        url: `http://localhost:5000/api/complement/${id}`
      }
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err})
  });
});

router.delete('/:complementid', auth, (req, res, next) => {
  const id = req.params.complementid
  Complement.deleteOne({_id: id})
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'Complement deleted',
      request: {
        type: 'POST',
        url: `http://localhost:5000/api/complement`,
        body: { name: 'String', price: 'Number', complement: 'Boolean'}
      }
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err})
  });
});

module.exports = router;