const express = require('express');
const router = express.Router();
const { 
    createNewOrder, 
    getOrder, 
    getAllOrdersList, 
    updateOrderDeliveryStatus, 
    removeOrder,
    getUserOrders
} = require('../controllers/OrdersController');

router.post('/create', createNewOrder);
router.get('/get/:orderId', getOrder);
router.get('/all', getAllOrdersList);
router.get('/user/:userId', getUserOrders);
router.put('/update/:orderId', updateOrderDeliveryStatus);
router.delete('/remove/:orderId', removeOrder);

module.exports = router;
