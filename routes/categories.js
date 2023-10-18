const express = require('express');
const router = express.Router();
const categoryModel = require('../models/categories');

// Get all category
router.get('/', async (req, res) => {
    try {
      const category = await categoryModel.find()
      res.json(products)
    } catch (err){
        res.status(500).json({message: err.message});
    }
});

// Get category by ID
router.get('/:id', getCategory, (req, res) => {
    res.json(res.category);
});

// Add a new category
router.post('/', async (req, res)  => {
    const category = new categoryModel({
        name: req.body.name
       
    })

    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    }catch (err) {
        res.status(400).json({message: err.message});
    }
});

// Update product by ID
router.put('/:id', getCategory, async (req, res) => {
    if (req.body.name != null) {
        res.product.name = req.body.name;
    }
   

    try {
        const updatedCategory = await res.caregory.save();
        res.json(updatedCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Remove category by ID
router.delete('/:id', getCategory, async (req, res) => {
    try{
        await categoryModel.findByIdAndRemove(req.params.id);
        res.json({message: 'Category deleted'});
    }catch(err) {
        res.status(400).json({message: err.message});
    }
});

// Remove all category
router.delete('/', (req, res) => {
    // Implement removing all categories
});

// Find category that contain 'kw'
router.get('/search/:kw', (req, res) => {
    // Implement searching for category
});


async function getCategory(req,res, next){
    let category
    try {
        category = await categoryModel.findById(req.params.id);
        if (category == null){
            return res.status(404).json({message: 'Cannot find category'});
        }
    } catch (err)
    {
        return res.status(500).json({message: err.message});
    }
    res.category = category
    next()
}
module.exports = router;