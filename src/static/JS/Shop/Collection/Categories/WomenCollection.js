document.addEventListener('DOMContentLoaded', async () => {
    const productContainer = document.querySelector('.flex.overflow-x-auto');
    const productNameToId = {};
    
    try {
        const response = await fetch('http://localhost:8000/product/get/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                category: "Women"
            })
        });

        const products = await response.json();
        
        productContainer.innerHTML = '';
        
        products.forEach(product => {
            productNameToId[product.productName] = product._id;
            
            const productCard = `
                <div class="min-w-[320px] sm:min-w-[0px] product-card bg-white rounded-lg shadow-sm overflow-hidden transform hover:scale-105 transition-transform duration-300" data-product-name="${product.productName}">
                    <img src="${product.productImage}" alt="${product.productName}" class="w-full h-64 object-cover">
                    <div class="p-4">
                        <h3 class="text-lg font-semibold mb-2">${product.productName}</h3>
                        <p class="text-gray-800 font-bold mb-2">$${product.productPrice}</p>
                        <button class="w-full bg-gray-800 text-white py-2 rounded-full hover:bg-gray-700 transition duration-300">Add to Cart</button>
                    </div>
                </div>
            `;
            productContainer.innerHTML += productCard;
        });

        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', () => {
                const productName = card.dataset.productName;
                const productId = productNameToId[productName];
                window.location.href = `/Product/${productId}`;
            });
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
});
