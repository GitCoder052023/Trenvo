let orders = [];
let filteredOrders = [];

// Get userId from URL
const userId = window.location.pathname.split('/')[3];

// Fetch orders from API
async function fetchOrders() {
    try {
        const response = await fetch(`http://localhost:8000/orders/user/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        orders = data.orders;
        filteredOrders = [...orders];
        renderOrders();
    } catch (error) {
        console.error('Error fetching order data:', error);
    }
}

function toggleDetails(sectionElement, toggleIcon) {
    sectionElement.classList.toggle('hidden');
    toggleIcon.querySelector('svg').classList.toggle('rotate-180');
}

function createProductElement(product) {
    const template = document.getElementById('productItemTemplate');
    const productElement = template.content.cloneNode(true);

    productElement.querySelector('.product-image').src = product.image;
    productElement.querySelector('.product-image').alt = product.name;
    productElement.querySelector('.product-name').textContent = product.name;
    productElement.querySelector('.product-size').textContent = `Size: ${product.size}`;
    productElement.querySelector('.product-quantity').textContent = `Qty: ${product.quantity}`;

    return productElement;
}

function handleTrackOrder(orderId) {
    window.location.href = `/User/Orders/Track/${orderId}`;
}

function createOrderElement(order) {
    const template = document.getElementById('orderItemTemplate');
    const orderElement = template.content.cloneNode(true);

    const date = new Date(order.createdAt).toLocaleDateString();
    orderElement.querySelector('.order-date').textContent = `Placed on: ${date}`;
    
    const statusElement = orderElement.querySelector('.order-status');
    statusElement.textContent = order.status.deliveryStatus;
    const statusColor = order.status.deliveryStatus === 'Pending' ? 'yellow' : 
                       order.status.isDelivered ? 'green' : 'blue';
    statusElement.classList.add(`bg-${statusColor}-100`, `text-${statusColor}-600`);

    orderElement.querySelector('.order-id').textContent = `Order ID: ${order._id}`;
    orderElement.querySelector('.order-paymentMethod').textContent = order.payment.paymentMethod;
    orderElement.querySelector('.order-totalAmount').textContent = order.payment.totalAmount;

    const productsList = orderElement.querySelector('.products-list');
    order.products.forEach(product => {
        const productElement = createProductElement(product);
        productsList.appendChild(productElement);
    });

    const additionalDetails = orderElement.querySelector('.additional-details');
    const expandButton = orderElement.querySelector('.expand-btn');
    const orderDetailsButton = orderElement.querySelector('.details-btn');
    
    [expandButton, orderDetailsButton].forEach(button => {
        button.addEventListener('click', () => toggleDetails(additionalDetails, expandButton));
    });

    const trackButton = orderElement.querySelector('.track-btn');
    trackButton.addEventListener('click', () => handleTrackOrder(order._id));

    return orderElement;
}

function renderOrders() {
    const ordersContainer = document.getElementById('ordersList');
    ordersContainer.innerHTML = '';

    filteredOrders.forEach(order => {
        const orderElement = createOrderElement(order);
        ordersContainer.appendChild(orderElement);
    });
}

function filterOrders() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    filteredOrders = orders.filter(order =>
        order.products.some(product =>
            product.name.toLowerCase().includes(searchInput) ||
            order.status.deliveryStatus.toLowerCase().includes(searchInput) ||
            order.customer.address.locality.toLowerCase().includes(searchInput) ||
            order._id.toString().includes(searchInput)
        )
    );
    renderOrders();
}

function setupEventListeners() {
    const searchInputElement = document.getElementById('searchInput');
    if (searchInputElement) {
        searchInputElement.addEventListener('input', filterOrders);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchOrders();
    setupEventListeners();
});