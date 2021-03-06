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
const productsEditTemplate = require('../../views/admin/products/edit')
const { requireTitle, requirePrice } = require('./validators');
const { getOne } = require('../../repositories/products');
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

//Edit form route

router.get('/admin/products/:id/edit', requireAuth, async (req, res) => {
    const { id } = req.params;
    const product = await productsRepo.getOne(id);

    if (!product) {
        return res.send('Product not found!');
    }

    res.send(productsEditTemplate({ product }));
});

//Edit product in the database route 

router.post('/admin/products/:id/edit', 
requireAuth, 
upload.single('image'),
[requireTitle, requirePrice], 
handleErrors(productsEditTemplate, async (req) => {
    const product = await productsRepo.getOne(req.params.id);
    return { product }
}),
async (req, res) => {
    const changes = req.body;

    if(req.file) {
        changes.image = req.file.buffer.toString('base64');
    }

    const { id } = req.params;
    
    try {
        await productsRepo.update(id, changes);
    } catch(e) {
        return res.send('Could not find item')
    }
    
    res.redirect('/admin/products')
});

// Product delete route for admin 

router.post('/admin/products/:id/delete', requireAuth, async (req, res) => {
    const { id } = req.params;
    await productsRepo.delete(id);
    res.redirect('/admin/products');
});


module.exports = router;