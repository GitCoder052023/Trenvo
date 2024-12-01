let selectedPaymentMethod = null;
const userId = window.localStorage.getItem('userId');

async function getUserProfile() {
    try {
        const response = await fetch('http://localhost:8000/profile/get/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "UserId": userId
            })
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
}

async function fetchProductDetails() {
    const productId = window.location.pathname.split('/').pop();
    try {
        const response = await fetch(`http://localhost:8000/product/get/${productId}`);
        productDetails = await response.json();
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}

function selectPaymentMethod(method) {
    selectedPaymentMethod = method;
    updatePaymentDetails(method);
    validatePaymentStep();
}

function updatePaymentDetails(method) {
    const paymentDetails = document.getElementById('paymentDetails');
    paymentDetails.innerHTML = '';
    paymentDetails.classList.remove('hidden');

    switch(method) {
        case 'creditCard':
            paymentDetails.innerHTML = `
                <div class="space-y-4">
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="cardNumber">
                            Card Number *
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="cardNumber" type="text" required>
                    </div>
                    <div class="flex space-x-4">
                        <div class="w-1/2">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="expiryDate">
                                Expiry Date *
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="expiryDate" type="text" placeholder="MM/YY" required>
                        </div>
                        <div class="w-1/2">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="cvv">
                                CVV *
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="cvv" type="text" required>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'netBanking':
            paymentDetails.innerHTML = `
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="bankSelect">
                        Select Your Bank *
                    </label>
                    <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="bankSelect" required>
                        <option value="">Choose a bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                    </select>
                </div>
            `;
            break;
        case 'upi':
            paymentDetails.innerHTML = `
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="upiId">
                        UPI ID *
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="upiId" type="text" placeholder="yourname@upi" required>
                </div>
            `;
            break;
        default:
            paymentDetails.classList.add('hidden');
            break;
    }

    const newInputs = paymentDetails.querySelectorAll('input, select');
    newInputs.forEach(input => {
        input.addEventListener('input', validatePaymentStep);
    });
}

function validatePaymentStep() {
    const completePaymentButton = document.getElementById('completePayment');
    let isValid = false;

    if (selectedPaymentMethod) {
        const paymentDetails = document.getElementById('paymentDetails');
        const requiredInputs = paymentDetails.querySelectorAll('input[required], select[required]');
        isValid = Array.from(requiredInputs).every(input => input.value.trim() !== '');
    }

    if (isValid) {
        completePaymentButton.classList.remove('bg-gray-300', 'cursor-not-allowed');
        completePaymentButton.classList.add('bg-[#3b82f6]', 'hover:bg-blue-700');
        completePaymentButton.disabled = false;
    } else {
        completePaymentButton.classList.add('bg-gray-300', 'cursor-not-allowed');
        completePaymentButton.classList.remove('bg-[#3b82f6]', 'hover:bg-blue-700');
        completePaymentButton.disabled = true;
    }
}

function nextStep(step) {
    document.getElementById('paymentStep').classList.add('hidden');
    document.getElementById('successStep').classList.add('hidden');
    document.getElementById(step + 'Step').classList.remove('hidden');

    if (step === 'payment') {
        validatePaymentStep();
    }
}

async function processPayment() {
    if (!selectedPaymentMethod) return;

    try {
        document.getElementById('completePayment').textContent = 'Processing...';
        document.getElementById('completePayment').disabled = true;

        // Get user profile data
        const userProfile = await getUserProfile();

        // Create order payload
        const orderPayload = {
            userId: userId,
            productName: productDetails.productName,
            image: productDetails.productImage,
            description: productDetails.productDescription,
            price: productDetails.productPrice,
            quantity: 1,
            size: "XXL",
            name: userProfile.user.name,
            phone: userProfile.user.phone,
            locality: userProfile.user.locality,
            street: userProfile.user.house,
            landmark: userProfile.user.landmark,
            paymentMethod: selectedPaymentMethod
        };

        // Make API call to create order
        const response = await fetch('http://localhost:8000/orders/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderPayload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Generate and display order summary
        const orderResponse = await response.json();
        const orderSummary = await generateOrderSummary(orderResponse.orderId);
        document.getElementById('orderSummary').innerHTML = orderSummary;
        
        // Show success step
        nextStep('success');

    } catch (error) {
        console.error('Error processing payment:', error);
        document.getElementById('completePayment').textContent = 'Complete Payment';
        document.getElementById('completePayment').disabled = false;
    }
}


async function generateOrderSummary(orderId) {
    if (!productDetails) return '';
    
    // Get user profile data
    let userProfile;
    try {
        userProfile = await getUserProfile();
    } catch (error) {
        console.error('Error getting user profile:', error);
        return '';
    }

    const quantity = 1;
    const subtotal = productDetails.productPrice * quantity;
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    // Create order info using dynamic user data
    const orderInfo = {
        customer: {
            OrderId: orderId,
            name: userProfile.user.name,
            phone: userProfile.user.phone,
            address: {
                locality: userProfile.user.locality,
                area: userProfile.user.road,
                street: userProfile.user.house,
                landmark: userProfile.user.landmark
            }
        },
        payment: {
            "Payment Method": selectedPaymentMethod,
            totalAmount: total
        },
        status: {
            deliveryStatus: "Pending",
            isDelivered: false
        }
    };
    
    return `
        <div class="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
            <h3 class="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Order Summary</h3>
            
            <!-- Order ID -->
            <div class="mb-4">
                <p class="text-sm text-gray-600">Order ID: <span class="font-semibold">${orderInfo.customer.OrderId}</span></p>
            </div>

            <!-- Customer Details -->
            <div class="mb-6">
                <h4 class="font-semibold text-gray-700 mb-2">Customer Details</h4>
                <p class="text-sm text-gray-600">Name: ${orderInfo.customer.name}</p>
                <p class="text-sm text-gray-600">Phone: ${orderInfo.customer.phone}</p>
                <p class="text-sm text-gray-600">Address: ${orderInfo.customer.address.street}, ${orderInfo.customer.address.locality}, ${orderInfo.customer.address.area}</p>
                <p class="text-sm text-gray-600">Landmark: ${orderInfo.customer.address.landmark}</p>
            </div>

            <!-- Product Details -->
            <div class="space-y-4">
                <div class="flex justify-between items-center">
                    <div>
                        <h4 class="font-semibold text-gray-700">${productDetails.productName}</h4>
                        <p class="text-sm text-gray-500">Qty: ${quantity} x ${productDetails.productPrice.toFixed(2)}</p>
                    </div>
                    <p class="font-medium text-gray-700">${subtotal.toFixed(2)}</p>
                </div>
                
                <!-- Price Breakdown -->
                <div class="border-t mt-4 pt-4">
                    <div class="flex justify-between items-center mb-2">
                        <p class="text-gray-600">Subtotal</p>
                        <p class="font-medium text-gray-700">${subtotal.toFixed(2)}</p>
                    </div>
                    <div class="flex justify-between items-center mb-2">
                        <p class="text-gray-600">Tax (10%)</p>
                        <p class="font-medium text-gray-700">${tax.toFixed(2)}</p>
                    </div>
                    <div class="flex justify-between items-center font-bold text-lg mt-4 border-t pt-4">
                        <p class="text-gray-800">Total</p>
                        <p class="text-[#3b82f6]">${total.toFixed(2)}</p>
                    </div>
                </div>

                <!-- Order Status -->
                <div class="mt-6 pt-4 border-t">
                    <h4 class="font-semibold text-gray-700 mb-2">Order Status</h4>
                    <p class="text-sm text-gray-600">Payment Method: ${orderInfo.payment["Payment Method"]}</p>
                    <p class="text-sm text-gray-600">Delivery Status: ${orderInfo.status.deliveryStatus}</p>
                </div>
            </div>
        </div>
    `;
}



function resetForm() {
    document.getElementById('checkoutForm').reset();
    selectedPaymentMethod = null;
    document.getElementById('paymentStep').classList.remove('hidden');
    document.getElementById('successStep').classList.add('hidden');
    document.getElementById('completePayment').classList.add('bg-gray-300', 'cursor-not-allowed');
    document.getElementById('completePayment').classList.remove('bg-[#3b82f6]', 'hover:bg-blue-700');
    document.getElementById('completePayment').disabled = true;
    document.getElementById('paymentDetails').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', fetchProductDetails);
document.getElementById('completePayment').addEventListener('click', processPayment);