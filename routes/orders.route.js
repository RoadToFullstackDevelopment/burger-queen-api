const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order.model');


router.get('/', async (req, res) => {
    try {
      const orders = await Order.find()
      res.json(orders)
    } catch (err) {
      res.status(500).json({message: err.message})
    }
});

router.post('/', async (req, res) => {
    const order = new Order({
    id: mongoose.Schema.Types.ObjectId,
    product: req.body.productid,
    quantity: req.body.quantity,
    waiterName: req.body.waiterName,
    clientName: req.body.clientName,
    timePreparation: req.body.timePreparation,
    orderReady: req.body.orderReady,
    orderServed: req.body.orderServed
  })

  try {
    const newOrder = await order.save()
    res.status(201).json(newOrder)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

router.get('/:orderid', getOrder, async (req, res) => {
    res.json(res.order)
});

router.put('/:orderid', getOrder, async (req, res) => {
    if (req.body.productid !== null) {
      res.order.productid = req.body.productid
    }
  
    if (req.body.quantity !== null) {
      res.order.quantity = req.body.quantity
    }
    try {
      const updatedOrder = await res.order.save()
      res.json(updatedOrder)
    } catch {
      res.status(400).json({ message: err.message })
    }
  
});

router.delete('/:orderid', getOrder, async (req, res) => {
    try {
      await res.order.remove()
      res.json({ message: 'Deleted This Order' })
    } catch(err) {
      res.status(500).json({ message: err.message })
    }
});

async function getOrder (req, res, next) {
    let order
    try {
      order = await Order.findById(req.params.orderid)
      if (order == null) {
        return res.status(404).json({ message: 'Cant find order'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
  
    res.order = order
    next()
}

module.exports = router;