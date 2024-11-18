document.addEventListener('DOMContentLoaded', function () {
    // Select navbar items and dropdown menus
    const categoriesLink = document.getElementById('cat');
    const accountLink = document.getElementById('acc');
    const dropdownMenu2 = document.getElementById('dropdown-menu2');
    const dropdownMenu3 = document.getElementById('dropdown-menu3');

    // Toggle dropdown on click for Categories
    categoriesLink.addEventListener('click', (event) => {
        event.preventDefault();
        const isVisible = dropdownMenu3.style.opacity === '1';
        dropdownMenu3.style.opacity = isVisible ? '0' : '1';
        dropdownMenu3.style.visibility = isVisible ? 'hidden' : 'visible';
    });

    // Toggle dropdown on click for Account
    accountLink.addEventListener('click', (event) => {
        event.preventDefault();
        const isVisible = dropdownMenu2.style.opacity === '1';
        dropdownMenu2.style.opacity = isVisible ? '0' : '1';
        dropdownMenu2.style.visibility = isVisible ? 'hidden' : 'visible';
    });

    // Hide the dropdown when clicking outside of it
    document.addEventListener('click', (event) => {
        if (!categoriesLink.contains(event.target) && !dropdownMenu3.contains(event.target)) {
            dropdownMenu3.style.opacity = '0';
            dropdownMenu3.style.visibility = 'hidden';
        }
        if (!accountLink.contains(event.target) && !dropdownMenu2.contains(event.target)) {
            dropdownMenu2.style.opacity = '0';
            dropdownMenu2.style.visibility = 'hidden';
        }
    });

    // Function to fetch featured products
    async function loadFeaturedProducts() {
        try {
            const response = await fetch('http://localhost:8000/product/get/feature', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ feature: "FP" })
            });
            const products = await response.json();
            
            const featuredBoxes = document.querySelectorAll('.featured-box');
            products.forEach((product, index) => {
                if (featuredBoxes[index]) {
                    featuredBoxes[index].querySelector('.name').textContent = product.productName;
                    featuredBoxes[index].querySelector('.price').textContent = `$${product.productPrice}`;
                }
            });
        } catch (error) {
            console.error('Error loading featured products:', error);
        }
    }

    // Function to fetch new arrivals
    async function loadNewArrivals() {
        try {
            const response = await fetch('http://localhost:8000/product/get/feature', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ feature: "NA" })
            });
            const products = await response.json();
            
            const arrivalBoxes = document.querySelectorAll('.Arrival-box');
            products.forEach((product, index) => {
                if (arrivalBoxes[index]) {
                    arrivalBoxes[index].querySelector('.name').textContent = product.productName;
                    arrivalBoxes[index].querySelector('p').textContent = product.productDescription;
                }
            });
        } catch (error) {
            console.error('Error loading new arrivals:', error);
        }
    }

    // Initialize dynamic content loading
    loadFeaturedProducts();
    loadNewArrivals();
});
