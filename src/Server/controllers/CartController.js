const { addProductToCart, getCartByUserId, updateProductInCart, removeProductFromCart, clearCart } = require('../models/Cart');

async function addToCart(req, res) {
    const { userId, productName, image, description, price, quantity, size } = req.body;
    
    const productData = {
        name: productName,
        image,
        description,
        price,
        quantity,
        size
    };

    try {
        const result = await addProductToCart(userId, productData);
        res.status(201).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product to cart', error: error.message });
    }
}

async function getUserCart(req, res) {
    const { userId } = req.params;
    try {
        const cart = await getCartByUserId(userId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error: error.message });
    }
}

async function updateCartProduct(req, res) {
    const { userId, productIndex } = req.params;
    const { quantity, size } = req.body;
    
    const updateData = {
        [`products.${productIndex}.quantity`]: quantity,
        [`products.${productIndex}.size`]: size
    };
    
    try {
        const result = await updateProductInCart(userId, parseInt(productIndex), updateData);
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Cart or product not found' });
        }
        res.status(200).json({ message: 'Product quantity and size updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
}


async function removeFromCart(req, res) {
    const { userId, productIndex } = req.params;
    try {
        const result = await removeProductFromCart(userId, productIndex);
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Cart or product not found' });
        }
        res.status(200).json({ message: 'Product removed from cart successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing product from cart', error: error.message });
    }
}

async function emptyCart(req, res) {
    const { userId } = req.params;
    try {
        const result = await clearCart(userId);
        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error clearing cart', error: error.message });
    }
}

module.exports = {
    addToCart,
    getUserCart,
    updateCartProduct,
    removeFromCart,
    emptyCart
};
