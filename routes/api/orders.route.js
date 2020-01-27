const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const auth = require('../auth');
const Product = require('../../models/product.model');
const Order = require('../../models/order.model');

router.get('/', async (req, res, next) => {
  try {
      const order = await Order.find().select('_id productid quantity waiterName clientName timePreparation orderServed orderReady')
      res.json(order)
  } catch (err) {
      res.status(500).json({ message: err.message })
  }
});

router.post('/', (req, res, next) => {
  Product.findById(req.body.productid)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: 'Product not found!'
        })
      }
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        product: req.body.productid,
        quantity: req.body.quantity,
        waiterName: req.body.waiterName,
        clientName: req.body.clientName,
        orderReady: req.body.orderReady,
        timePreparation: req.body.timePreparation,
        orderServed: req.body.orderServed
      })
      return order.save()
    })
    .then(result => {
      console.log(result)
      res.status(201).json({
        message: 'Order stored',
        createdOrder: {
          _id: result._id,
          product: result.productid,
          quantity: result.quantity,
          waiterName: result.waiterName,
          clientName: result.clientName,
          orderReady: result.orderReady,
          timePreparation: result.timePreparation,
          orderServed: result.orderServed
        },
        request: {
          type: 'GET',
          url: `http://localhost:5000/api/orders/${result._id}`
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: err})
    });
});

router.get('/:orderid', (req, res, next) => {
  Order.findById(req.params.orderid)
  .populate('product')
  .exec()
  .then(order => {
    res.status(200).json({
      order: order,
      request: {
        type: 'GET',
        url: `http://localhost:5000/api/orders`
      }
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err})
  });
});

router.put('/:orderid', (req, res, next) => {
  res.status(200).json({
    message: 'Order updated',
    orderid: req.params.orderid
  })
});

router.delete('/:orderid', (req, res, next) => {
  Order.deleteOne({_id: req.params.orderid})
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Order deleted!',
        request: {
          type: 'POST',
          url: `http://localhost:5000/api/orders`,
          body: { product: 'ID', quantity: 'Number', waiterName: 'String', clientName: 'String', complement: 'Boolean', orderReady: 'Boolean', timePreparation: 'Number', orderServed: 'Boolean'}
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: err})
    });
});

module.exports = router;