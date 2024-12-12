document.addEventListener('DOMContentLoaded', async () => {
    const productId = window.location.pathname.split('/').pop();
    const userId = window.localStorage.getItem('userId');
    const mainContent = document.querySelector('main');
    const originalContent = mainContent.innerHTML;
    
    mainContent.innerHTML = `
        <div class="flex items-center justify-center min-h-[60vh]">
            <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    `;

    const response = await fetch(`http://localhost:8000/product/get/${productId}`);
    const product = await response.json();

    try {
        mainContent.innerHTML = originalContent;

        // Get button references after restoring content
        const addToCartBtn = document.getElementById('addToCartBtn');
        const buyBtn = document.getElementById('BuyBtn');

        // Update product details
        document.querySelector('h1.text-3xl').textContent = product.productName;
        document.querySelector('p.text-gray-600').textContent = product.productDescription;
        document.querySelector('img[alt="Product image"]').src = product.productImage;
        document.querySelector('p.text-2xl.font-bold.text-gray-900').textContent = `${product.productPrice}`;

        addToCartBtn.addEventListener('click', async () => {
            try {
                const cartData = {
                    userId: userId,
                    productName: product.productName,
                    image: product.productImage,
                    description: product.productDescription,
                    price: product.productPrice,
                    quantity: 1,
                    size: "XL"
                };
        
                const response = await fetch('http://localhost:8000/cart/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(cartData)
                });
        
                if (!response.ok) {
                    throw new Error('Failed to add item to cart');
                }
        
                window.location.href = `/cart/${userId}`;
        
            } catch (error) {
                console.error('Error adding to cart:', error);
                alert('Failed to add item to cart. Please try again.');
            }
        });

        buyBtn.addEventListener('click', () => {
            window.location.href = `/Payments/Checkout/${productId}`;
        });

        // Tabs functionality
        const detailsTab = document.getElementById('detailsTab');
        const reviewsTab = document.getElementById('reviewsTab');
        const detailsContent = document.getElementById('detailsContent');
        const reviewsContent = document.getElementById('reviewsContent');

        detailsTab.addEventListener('click', () => {
            detailsTab.classList.add('border-b-2', 'border-blue-500', 'text-blue-500');
            detailsTab.classList.remove('text-gray-600', 'hover:text-gray-800');
            reviewsTab.classList.remove('border-b-2', 'border-blue-500', 'text-blue-500');
            reviewsTab.classList.add('text-gray-600', 'hover:text-gray-800');

            detailsContent.classList.remove('hidden');
            reviewsContent.classList.add('hidden');
        });

        reviewsTab.addEventListener('click', () => {
            reviewsTab.classList.add('border-b-2', 'border-blue-500', 'text-blue-500');
            reviewsTab.classList.remove('text-gray-600', 'hover:text-gray-800');
            detailsTab.classList.remove('border-b-2', 'border-blue-500', 'text-blue-500');
            detailsTab.classList.add('text-gray-600', 'hover:text-gray-800');

            reviewsContent.classList.remove('hidden');
            detailsContent.classList.add('hidden');
        });

    } catch (error) {
        console.error('Error loading product details:', error);
        mainContent.innerHTML = `
            <div class="flex items-center justify-center min-h-[60vh] text-red-500">
                <div class="text-center">
                    <i class="fas fa-exclamation-circle text-5xl mb-4"></i>
                    <p class="text-xl">Failed to load product details</p>
                </div>
            </div>
        `;
    }
});
