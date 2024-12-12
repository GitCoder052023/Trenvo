const cart = document.getElementById("cart-icon")
const shop = document.getElementById("ShopBtn")
const ProfileButton = document.getElementById("User-icon") 
const wishlistButton = document.querySelector('.fas.fa-heart');
const productCards = document.querySelectorAll('.product-card');
const userId =  window.localStorage.getItem('userId');

wishlistButton.addEventListener("click", () => {
    window.location.href = "/User/Profile/Wishlist";
});


cart.addEventListener("click", ()=>{
    window.location.href = `/cart/${userId}`;
})

shop.addEventListener("click", ()=>{
    window.location.href = "/shop"
})

ProfileButton.addEventListener("click", ()=>{
    window.location.href = "/User/Profile/"
})