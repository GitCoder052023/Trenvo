document.getElementById('backBtn').addEventListener('click', function() {
    window.location.href = `/User/Orders/${window.localStorage.getItem('userId')}`;
});

fetch('/static/JSON/Tracking_Data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Failed to load order_tracking_data.json: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    const orderDetails = data.orderDetails;
    populateOrderDetails(orderDetails);
    populateTimeline(orderDetails.timeline);
    populateItems(orderDetails.items);
  })
  .catch(error => {
    console.error('Error fetching order tracking data:', error);
  });

function populateOrderDetails(orderDetails) {
  document.getElementById('orderNumber').textContent = orderDetails.orderNumber;
  document.getElementById('status').textContent = orderDetails.status;
  document.getElementById('estimatedDelivery').textContent = orderDetails.estimatedDelivery;
  document.getElementById('currentLocation').textContent = orderDetails.currentLocation;
  document.getElementById('shippingAddress').textContent = orderDetails.shippingAddress;
  document.getElementById('orderDate').textContent = orderDetails.orderDate;
  document.getElementById('shippingMethod').textContent = orderDetails.shippingMethod;
}

function populateTimeline(timeline) {
  const timelineContainer = document.getElementById('timeline');
  timeline.forEach(item => {
    const row = document.createElement('tr');
    row.classList.add('border-b');
    row.innerHTML = `
      <td class="py-2 px-4 flex items-center">
        <i class="fas ${item.icon} ${item.color}"></i>
        <span class="ml-2">${item.status}</span>
      </td>
      <td class="py-2 px-4">${item.date || '-'}</td>
      <td class="py-2 px-4">${item.time || '-'}</td>
    `;
    timelineContainer.appendChild(row);
  });
}

function populateItems(items) {
  const itemsContainer = document.getElementById('items');
  items.forEach(item => {
    const row = document.createElement('tr');
    row.classList.add('border-b');
    row.innerHTML = `
      <td class="py-2 px-4">${item.name}</td>
      <td class="py-2 px-4">${item.quantity}</td>
      <td class="py-2 px-4">${item.price}</td>
    `;
    itemsContainer.appendChild(row);
  });
}