const express = require('express');
const router = express.Router();
const {
    addToCart,
    getUserCart,
    updateCartProduct,
    removeFromCart,
    emptyCart
} = require('../controllers/CartController');

router.post('/add', addToCart);
router.get('/user/:userId', getUserCart);
router.put('/update/:userId/:productIndex', updateCartProduct);
router.delete('/remove/:userId/:productIndex', removeFromCart);
router.delete('/clear/:userId', emptyCart);

module.exports = router;
