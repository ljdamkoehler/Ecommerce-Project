//***REQUIREMENTS***
const express = require('express');
const multer = require('multer');
const { handleErrors, requireAuth } = require('./middlewares');

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() })
const productsRepo = require('../../repositories/products');
const { create } = require('../../repositories/users');
const productsNewTemplate = require('../../views/admin/products/new');
const productsIndexTemplate = require('../../views/admin/products/index')
const { requireTitle, requirePrice } = require('./validators');
//*******

// Product Index Route
router.get('/admin/products', requireAuth, async (req, res) => {
    const products = await productsRepo.getAll();
    res.send(productsIndexTemplate({ products }))
})

//Create new product form route
router.get('/admin/products/new', requireAuth, (req, res) => {
    res.send(productsNewTemplate({}))
})

//New product submission route... POST

router.post('/admin/products/new', requireAuth, 
upload.single('image'),
[requireTitle, requirePrice],
handleErrors(productsNewTemplate),  
async (req, res) => {
    const image = req.file.buffer.toString('base64');
    const { title, price } = req.body;

    await productsRepo.create({ title, price, image })

    res.redirect('/admin/products');
})

module.exports = router;