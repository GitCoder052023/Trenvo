document.addEventListener('DOMContentLoaded', async () => {
    // Extract product ID from URL
    const productId = window.location.pathname.split('/').pop();

    try {
        // Fetch product details
        const response = await fetch(`http://localhost:8000/product/get/${productId}`);
        const product = await response.json();

        // Update product details in the DOM
        document.querySelector('h1.text-3xl').textContent = product.productName;
        document.querySelector('p.text-gray-600').textContent = product.productDescription;
        document.querySelector('img[alt="Product image"]').src = product.productImage;
        document.querySelector('p.text-2xl.font-bold.text-gray-900').textContent = `$${product.productPrice}`;

    } catch (error) {
        console.error('Error loading product details:', error);
    }

    const buyBtn = document.getElementById('BuyBtn');
    
    buyBtn.addEventListener('click', () => {
        window.location.href = "/Payments/Checkout/";
    });

    // Tabs
    const detailsTab = document.getElementById('detailsTab');
    const reviewsTab = document.getElementById('reviewsTab');
    const detailsContent = document.getElementById('detailsContent');
    const reviewsContent = document.getElementById('reviewsContent');

    detailsTab.addEventListener('click', () => {
        // Activate Details Tab
        detailsTab.classList.add('border-b-2', 'border-blue-500', 'text-blue-500');
        detailsTab.classList.remove('text-gray-600', 'hover:text-gray-800');
        reviewsTab.classList.remove('border-b-2', 'border-blue-500', 'text-blue-500');
        reviewsTab.classList.add('text-gray-600', 'hover:text-gray-800');

        // Show Details Content
        detailsContent.classList.remove('hidden');
        reviewsContent.classList.add('hidden');
    });

    reviewsTab.addEventListener('click', () => {
        // Activate Reviews Tab
        reviewsTab.classList.add('border-b-2', 'border-blue-500', 'text-blue-500');
        reviewsTab.classList.remove('text-gray-600', 'hover:text-gray-800');
        detailsTab.classList.remove('border-b-2', 'border-blue-500', 'text-blue-500');
        detailsTab.classList.add('text-gray-600', 'hover:text-gray-800');

        // Show Reviews Content
        reviewsContent.classList.remove('hidden');
        detailsContent.classList.add('hidden');
    });
});
