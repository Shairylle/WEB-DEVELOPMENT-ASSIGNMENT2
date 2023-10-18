const express = require('express');
const router = express.Router();
const productModel = require('../models/product');
// Get all products
router.get('/', async (req, res) => {
    try {
      const products = await productModel.find()
      res.json(products)
    } catch (err){
        res.status(500).json({message: err.message});
    }
});

// Get product by ID
router.get('/:id', getProduct, (req, res) => {
    res.json(res.product);
});

// Add a new product
router.post('/', async (req, res)  => {
    const product = new productModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category
    })

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    }catch (err) {
        res.status(400).json({message: err.message});
    }
});

// Update product by ID
router.put('/:id', getProduct, async (req, res) => {
    if (req.body.name != null) {
        res.product.name = req.body.name;
    }
    if (req.body.description != null) {
        res.product.description = req.body.description;
    }
    if (req.body.price != null) {
        res.product.price = req.body.price;
    }
    if (req.body.quantity != null) {
        res.product.quantity = req.body.quantity;
    }
    if (req.body.category != null) {
        res.product.category = req.body.category;
    }

    try {
        const updatedProduct = await res.product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Remove product by ID
router.delete('/:id', getProduct, async (req, res) => {
    try{
        await productModel.findByIdAndRemove(req.params.id);
        res.json({message: 'Product deleted'});
    }catch(err) {
        res.status(400).json({message: err.message});
    }
});

// Remove all products
router.delete('/', (req, res) => {
    // Implement removing all products
});

// Find products that contain 'kw'
router.get('/search/:kw', (req, res) => {
    // Implement searching for products
});


async function getProduct(req,res, next){
    let product
    try {
        product = await productModel.findById(req.params.id);
        if (product == null){
            return res.status(404).json({message: 'Cannot find product'});
        }
    } catch (err)
    {
        return res.status(500).json({message: err.message});
    }
    res.product = product
    next()
}
module.exports = router; 
