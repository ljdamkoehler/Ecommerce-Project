//***REQUIREMENTS***
const express = require('express');

const { validationResult } = require('express-validator')

const req = require('express/lib/request');

const router = express.Router();

const productsRepo = require('../../repositories/products')

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

router.post('/admin/products/new', [requireTitle, requirePrice], async (req, res) => {
    const errors = validationResult(req);
    console.log(req.body);
    res.send('Your new product was submitted!!')
})

module.exports = router;