# 🛍️ Wardrobe

![Status](https://img.shields.io/badge/Status-Under_Development-yellow?style=flat-square)
![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-blue?style=flat-square)
![Contributors](https://img.shields.io/github/contributors/GitCoder052023/The-Wardrobe?style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js-16.x-green?style=flat-square)
![Express.js](https://img.shields.io/badge/Express.js-4.x-brightgreen?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-5.x-darkgreen?style=flat-square)
![JWT](https://img.shields.io/badge/JWT-JSON_Web_Tokens-red?style=flat-square)
![Nodemailer](https://img.shields.io/badge/Nodemailer-6.x-lightgrey?style=flat-square)

## 📖 About

**Wardrobe** is an elegant and luxurious e-commerce web application providing a seamless online shopping experience. The project is currently **under heavy development**, and many features are yet to be implemented.

> **Note:** This README is primarily for developers contributing to this project.

## 🌟 Current Features

- **Front-End:**
  - 🎨 **Landing Page:** A modern home page showcasing featured products and collections.
  - 📄 **Static Pages:** Includes "About Us" and "Contact Us" sections.
  - 🔐 **Login & Signup Pages:** Basic forms for user authentication.
  - 🛒 **Shopping & Product Pages:** General shopping pages for browsing products.
  - 🛍️ **Cart, Checkout, and Payment Pages:** Includes static interfaces for cart review and payment methods.
  - 🧑‍💼 **Profile & Wishlist Pages:** User profile and wishlist functionalities with dynamic content.
  - 🚚 **Order & Track Order Pages:** Dynamic order tracking pages with interactive features.
  - 🔄 **Password Reset Flow:** A secure multi-step process with email and OTP verification.

- **Back-End:**
  - 🌐 **Node.js & Express:** Serving static files and handling routing efficiently.
  - 🗃️ **MongoDB:** Storing user data and product information.
  - 🔑 **JWT Authentication:** JSON Web Tokens for secure, stateless user authentication and session management.
  - 📧 **Nodemailer:** Handles email sending for notifications, password resets, and order confirmations.

## 💻 Tech Stack

- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white&style=flat-square)
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white&style=flat-square)
- ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white&style=flat-square)
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=flat-square)
- ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=flat-square)
- ![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white&style=flat-square)
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=flat-square)
- ![JWT](https://img.shields.io/badge/JWT-JSON_Web_Tokens-red?style=flat-square)
- ![Nodemailer](https://img.shields.io/badge/Nodemailer-6.x-lightgrey?style=flat-square)

## 📋 Pre-requisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.x or above) - [Download Node.js](https://nodejs.org/)
- **MongoDB** (v5.x or above) - [Download MongoDB](https://www.mongodb.com/)
- **Git** - [Download Git](https://git-scm.com/)

## 🛠️ Project Setup (For Developers)

### Step 1: Clone the Repository
```bash
git clone https://github.com/GitCoder052023/Wardrobe.git
```

### Step 2: Navigate to the Project Directory
```bash
cd Wardrobe
```

### Step 3: Install Dependencies
```bash
npm i
```

### Step 4: Set Up Environment Variables
Create a `.env` file in the root directory and add the following:
```env
PORT=3000
MONGO_URI=MongoDB-URI
JWT_SECRET=YOUR_JWT_SECRET
SENDER_EMAIL=YOUR_EMAIL_ADDRESS
SENDER_APP_PASSWORD=YOUR_APP_PASSWORD
CLOUDINARY_CLOUD_NAME=REPLACE_WITH_YOUR_OWN_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=REPLACE_WITH_YOUR_OWN_CLOUDINARY_API_KEY
CLOUDNINARY_API_SECRET=REPLACE_WITH_YOUR_OWN_CLOUDNINARY_API_SECRET
```

### Step 5: Run the Application
```bash
npm run dev
```

### Step 6: Access the Application
Open your browser and go to `http://localhost:3000`.

## 🏗️ System Architecture

```bash
Wardrobe
|   .gitignore
|   .env.example
|   CODE_OF_CONDUCT.md
|   CONTRIBUTING.md
|   SECURITY.md
|   package-lock.json
|   package.json
|   tailwind.config.js
|   README.md
│
└───src
    │   app.js
    │
    ├───routes
    │       auth.js
    │       cart.js
    │       Collection.js
    │       info.js
    │       main.js
    │       Orders.js
    │       Payments.js
    │       Product.js
    │       shop.js
    │       User.js
    │
    ├───Server
    │   │   server.js
    │   │
    │   ├───config
    │   │       db.js
    │   │
    │   ├───controllers
    │   │       authController.js
    │   │       ContactController.js
    │   │       MediaManagerController.js
    │   │       ProductController.js
    │   │       profileController.js
    │   │       ResetPasswordController.js
    │   │
    │   ├───models
    │   │       product.js
    │   │       User.js
    │   │
    │   ├───routes
    │   │       authRoutes.js
    │   │       ContactRoutes.js
    │   │       index.js
    │   │       MediaManagerRoutes.js
    │   │       ProductRoutes.js
    │   │       profileRoutes.js
    │   │
    │   └───utils
    │           authUtils.js
    │           CloudinaryHelper.js
    │           passwordUtils.js
    │           SendMail.js
    │
    ├───static
    │   ├───Assets
    │   │   ├───img
    │   │   │
    │   │   └───Videos
    │   ├───CSS
    │   │   │   404.CSS
    │   │   │   LandingPage.css
    │   │   │   main.css
    │   │   │   output.css
    │   │   │
    │   │   └───Shop
    │   │           Shop.css
    │   │
    │   ├───JS
    │   │   │   LandingPage.js
    │   │   │
    │   │   ├───Auth
    │   │   │       login.js
    │   │   │       Reset-Password.js
    │   │   │       signup.js
    │   │   │       Submit-Email.js
    │   │   │       SubmitOTP.js
    │   │   │
    │   │   ├───cart
    │   │   │       cart.js
    │   │   │       checkout.js
    │   │   │
    │   │   ├───Contact
    │   │   │       Contact.js
    │   │   │
    │   │   ├───Orders
    │   │   │       Orders.js
    │   │   │       TrackOrders.js
    │   │   │
    │   │   ├───Payment
    │   │   │       Payment.js
    │   │   │
    │   │   ├───Shop
    │   │   │   │   Shop.js
    │   │   │   │
    │   │   │   └───Collection
    │   │   │       │   Collection.js
    │   │   │       │
    │   │   │       ├───Categories
    │   │   │       │       AccessoriesCollection.js
    │   │   │       │       MenCollection.js
    │   │   │       │       WearablesCollection.js
    │   │   │       │       WomenCollection.js
    │   │   │       │
    │   │   │       └───Product
    │   │   │               Product.js
    │   │   │
    │   │   └───User
    │   │           Profile.js
    │   │           Wishlist.js
    │   │
    │   ├───JSON
    │   │       Collection_Products.json
    │   │       Orders_Data.json
    │   │       Tracking_Data.json
    │   │       Wishlist_Products.json
    │   │
    │   └───Utilities
    │           CategoriesCollection.js
    │
    └───templates
        │   LandingPage.html
        │
        ├───Auth
        │       login.html
        │       Reset-Password.html
        │       signup.html
        │       Submit-Email.html
        │       SubmitOTP.html
        │
        ├───cart
        │       cart.html
        │       checkout.html
        │
        ├───info
        │       About.html
        │       Contact.html
        │       Request_Success.html
        │
        ├───Orders
        │       Orders.html
        │       TrackOrders.html
        │
        ├───Payments
        │       Payment.html
        │
        ├───Shop
        │   │   Shop.html
        │   │
        │   └───Collections
        │       │   Collection.html
        │       │
        │       ├───Categories
        │       │       AccessoriesCollection.html
        │       │       MenCollection.html
        │       │       WearablesCollection.html
        │       │       WomenCollection.html
        │       │
        │       └───Product
        │               Product.html
        │
        ├───User
        │       Profile.html
        │       Wishlist.html
        │
        └───Utility
                404.html
```