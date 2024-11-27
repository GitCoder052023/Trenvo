const { createOrder, getOrderById, getAllOrders, updateOrderStatus, deleteOrder, getOrdersByUserId } = require('../models/Order');

async function createNewOrder(req, res) {
    const orderData = {
        product: {
            name: req.body.productName,
            image: req.body.image,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            size: req.body.size
        },
        customer: {
            userId: req.body.userId,
            name: req.body.name,
            phone: req.body.phone,
            address: {
                locality: req.body.locality,
                area: req.body.area,
                street: req.body.street,
                landmark: req.body.landmark
            }
        },
        payment: {
            isCOD: req.body.isCOD || false
        },
        status: {
            deliveryStatus: req.body.deliveryStatus || 'Pending',
            isDelivered: req.body.isDelivered || false
        },
        createdAt: new Date()
    };

    try {
        const result = await createOrder(orderData);
        res.status(201).json({ message: 'Order created successfully', orderId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
}

async function getOrder(req, res) {
    const orderId = req.params.orderId;
    try {
        const order = await getOrderById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error: error.message });
    }
}

async function getUserOrders(req, res) {
    const userId = req.params.userId;
    try {
        const orders = await getOrdersByUserId(userId);
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user orders', error: error.message });
    }
}


async function getAllOrdersList(req, res) {
    try {
        const orders = await getAllOrders();
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
}

async function updateOrderDeliveryStatus(req, res) {
    const orderId = req.params.orderId;
    const { deliveryStatus, isDelivered } = req.body;
    
    try {
        const result = await updateOrderStatus(orderId, {
            'status.deliveryStatus': deliveryStatus,
            'status.isDelivered': isDelivered
        });
        
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        res.status(200).json({ message: 'Order status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status', error: error.message });
    }
}

async function removeOrder(req, res) {
    const orderId = req.params.orderId;
    
    try {
        const result = await deleteOrder(orderId);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error: error.message });
    }
}

module.exports = {
    createNewOrder,
    getOrder,
    getAllOrdersList,
    updateOrderDeliveryStatus,
    removeOrder,
    getUserOrders
};
