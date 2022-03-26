//***REQUIREMENTS***
const express = require('express');
const { validationResult } = require('express-validator')
const multer = require('multer');

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() })
const productsRepo = require('../../repositories/products');
const { create } = require('../../repositories/users');
const productsNewTemplate = require('../../views/admin/products/new')
const { requireTitle, requirePrice } = require('./validators');
//*******

// Product Index Route
router.get('/admin/products', (req, res) => {

})

//Create new product form route
router.get('/admin/products/new', (req, res) => {
    res.send(productsNewTemplate({}))
})

//New product submission route... POST

router.post('/admin/products/new', 
upload.single('image'),
[requireTitle, requirePrice],  
async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.send(productsNewTemplate({ errors }))
    }

    const image = req.file.buffer.toString('base64');
    const { title, price } = req.body;

    await productsRepo.create({ title, price, image })

    res.send('Your new product was submitted!!')
})

module.exports = router;