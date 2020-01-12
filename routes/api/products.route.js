const express = require('express');
const router = express.Router();
const Product = require('../../models/product.model');
const mongoose = require('mongoose');


router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    kindOfProduct: req.body.kindOfProduct,
    complement: req.body.complement
  })
  try {
    const newProduct = await product.save()
    res.status(201).json(newProduct)
  } catch (err){
    res.status(400).json({message: err.message})
  }
});

router.get('/:productid', getProduct, async (req, res) => {
  res.json(res.product)
});

router.put('/:productid', getProduct, async (req, res) => {
  if (req.body.name !== null) {
    res.product.name = req.body.name
  }

  if (req.body.price !== null) {
    res.product.price = req.body.price
  }

  try {
    const updatedProduct = await res.product.save()
    res.json(updatedProduct)
  } catch (err) {
    res.status(400).json({message: err.message})
  }
});

router.delete('/:productid', getProduct, async (req, res) => {
  try {
    await res.product.remove()
    res.json({ message: 'Deleted product' })
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

async function getProduct (req, res, next) {
  let product
  try {
    product = await Product.findById(req.params.productid)
    if (product === null) {
      return res.status(404).json({ message: 'Cannot find product'})
    }
  } catch(err){
    return res.status(500).json({ message: err.message })
  }

  res.product = product
  next()
}
  

module.exports = router;