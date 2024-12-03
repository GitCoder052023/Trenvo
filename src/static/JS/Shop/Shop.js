document.addEventListener('DOMContentLoaded', function () {
    const categoriesLink = document.getElementById('cat');
    const accountLink = document.getElementById('acc');
    const dropdownMenu2 = document.getElementById('dropdown-menu2');
    const dropdownMenu3 = document.getElementById('dropdown-menu3');
    const logoutLink = document.getElementById('logout');
    const userId =  window.localStorage.getItem('userId');
    const baseURL = "/shop/Collection/Categories/";
    const OrderLink = document.getElementById('OrderLink');
    let productNameToId = {};

    OrderLink.addEventListener('click', () => {
        window.location.href = `/User/Orders/${userId}`;
    });

    const SBC_Cards = {
        "SBC_Mens": document.getElementById('Mens'),
        "SBC_Womens": document.getElementById('Womens'),
        "SBC_Wearables": document.getElementById('Wearables'),
        "SBC_Accessories": document.getElementById('Accessories'),
    };
    
    
    Object.entries(SBC_Cards).forEach(([id, element]) => {
        if (element) {
            element.style.cursor = 'pointer';
            element.addEventListener('click', () => {
                window.location.href = baseURL + id.replace('SBC_', '');
            });
        }
    });

    logoutLink.addEventListener('click', async () => {
        try {
            const response = await fetch('http://localhost:8000/profile/logout', {
                method: 'DELETE',
                headers: {
                    'Authorization': userId,
                    'Content-Type': 'application/json'
                }
            });
    
            const data = await response.json();
    
            if (response.ok) {
                window.localStorage.removeItem('userId');
                window.localStorage.removeItem('jwtToken');
                window.location.href = '/';
            } else {
                console.log('Logout failed:', data.message);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    });
    

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
            
            // Store product name to ID mappings
            products.forEach(product => {
                productNameToId[product.productName] = product._id;
            });
    
            const featuredBoxes = document.querySelectorAll('.featured-box');
            products.forEach((product, index) => {
                if (featuredBoxes[index]) {
                    featuredBoxes[index].querySelector('.name').textContent = product.productName;
                    featuredBoxes[index].querySelector('.price').textContent = `${product.productPrice}`;
                    
                    const imgDiv = featuredBoxes[index].querySelector('.img');
                    imgDiv.style.backgroundImage = `url(${product.productImage})`;
                    imgDiv.style.backgroundSize = 'cover';
                    imgDiv.style.backgroundPosition = 'center';
    
                    // Add click handler
                    featuredBoxes[index].addEventListener('click', () => {
                        const productId = productNameToId[product.productName];
                        window.location.href = `/Product/${productId}`;
                    });
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
            
            // Store product name to ID mappings
            products.forEach(product => {
                productNameToId[product.productName] = product._id;
            });
    
            const arrivalBoxes = document.querySelectorAll('.Arrival-box');
            products.forEach((product, index) => {
                if (arrivalBoxes[index]) {
                    arrivalBoxes[index].querySelector('.name').textContent = product.productName;
                    arrivalBoxes[index].querySelector('p').textContent = product.productDescription;
                    
                    const imgDiv = arrivalBoxes[index].querySelector('.img');
                    imgDiv.style.backgroundImage = `url(${product.productImage})`;
                    imgDiv.style.backgroundSize = 'cover';
                    imgDiv.style.backgroundPosition = 'center';
    
                    // Update the View Detail button click handler
                    const viewDetailBtn = arrivalBoxes[index].querySelector('button');
                    viewDetailBtn.onclick = () => {
                        const productId = productNameToId[product.productName];
                        window.location.href = `/Product/${productId}`;
                    };
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
