document.getElementById('backBtn').addEventListener('click', function () {
  window.location.href = `/User/Orders/${window.localStorage.getItem('userId')}`;
});

// Get orderId from URL
const orderId = window.location.pathname.split('/').pop();

// Fetch order details from API
async function fetchOrderDetails() {
  try {
    const response = await fetch(`http://localhost:8000/orders/get/${orderId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const orderDetails = data.order;
    populateOrderDetails(orderDetails);
    populateUserDetails(orderDetails);
    populateItems(orderDetails.products);
  } catch (error) {
    console.error('Error fetching order tracking data:', error);
  }
}

function populateOrderDetails(orderDetails) {
  document.getElementById('orderNumber').textContent = orderDetails._id;
  document.getElementById('status').textContent = orderDetails.status.deliveryStatus;
  document.getElementById('estimatedDelivery').textContent = 'Within 5-7 days'; // Can be made dynamic if API provides this
  document.getElementById('shippingAddress').textContent = `${orderDetails.customer.address.street}, ${orderDetails.customer.address.locality}, ${orderDetails.customer.address.landmark}`;
  document.getElementById('orderDate').textContent = new Date(orderDetails.createdAt).toLocaleDateString();
}

function populateUserDetails(orderDetails) {
  document.getElementById('userId').textContent = orderDetails.customer.userId;
  document.getElementById('userName').textContent = orderDetails.customer.name;
  document.getElementById('phoneNumber').textContent = orderDetails.customer.phone;
  document.getElementById('paymentMethod').textContent = orderDetails.payment.paymentMethod;
  document.getElementById('totalAmount').textContent = orderDetails.payment.totalAmount;
}

function populateItems(items) {
  const itemsContainer = document.getElementById('items');
  items.forEach(item => {
    const row = document.createElement('tr');
    row.classList.add('border-b');
    row.innerHTML = `
      <td class="py-2 px-4">${item.name}</td>
      <td class="py-2 px-4">${item.quantity}</td>
      <td class="py-2 px-4">$${item.price}</td>
    `;
    itemsContainer.appendChild(row);
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', fetchOrderDetails);
