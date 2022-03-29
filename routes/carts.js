const express = require('express');
const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');
const cartShowTemplate = require('../views/carts/show');

const router = express.Router();

// Receive a POST request to add an item to the cart

router.post('/cart/products', async (req, res) => {
    const id = req.body.productId;
    // Figure out the cart.
    let cart;
    if(!req.session.cartId) {
        //We do not have a cart, we need to create one and ...
        cart = await cartsRepo.create({ items: [] })
        //Store cartId on req.session.cartId cookie
        req.session.cartId = cart.id;
    } else {
        //We have a cart... so we need to get it from the cartRepo
        const id = req.session.cartId;
        cart = await cartsRepo.getOne(id);
    }
    // Either incrament qty for exisiting product or add new product to items array
    const exisitingItem = cart.items.find(item => item.id === id);
    if (exisitingItem) {
        //Increment qty 
        exisitingItem.quantity++;
    } else {
        // Add item's productId to the cart's items array 
        cart.items.push({ id, quantity: 1 });
    }

    // In any caes, I need to save the new or updated cart
    await cartsRepo.update(cart.id, {
        items: cart.items
    });

    console.log(cart);
    res.send('Product added to cart!!')
})

// Receive a GET request to show all items in cart

router.get('/cart', async (req, res) => {
    if(!req.session.cartId) {
        return res.redirect('/')    
    }

    const cart = await cartsRepo.getOne(req.session.cartId);

    for (let item of cart.items) {
        const product = await productsRepo.getOne(item.id);

        item.product = product;
    }

    res.send(cartShowTemplate({ items: cart.items }))
});

// Receive a POST request to delete an item in a cart

module.exports = router;