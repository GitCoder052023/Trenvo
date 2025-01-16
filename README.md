# 🛍️ Trenvo

![Status](https://img.shields.io/badge/Status-Under_Development-yellow?style=flat-square)
![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-blue?style=flat-square)
![Contributors](https://img.shields.io/github/contributors/GitCoder052023/The-Trenvo?style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js-16.x-green?style=flat-square)
![Express.js](https://img.shields.io/badge/Express.js-4.x-brightgreen?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-5.x-darkgreen?style=flat-square)
![JWT](https://img.shields.io/badge/JWT-JSON_Web_Tokens-red?style=flat-square)
![Nodemailer](https://img.shields.io/badge/Nodemailer-6.x-lightgrey?style=flat-square)

## 📖 About

**Trenvo** is an elegant and luxurious e-commerce web application providing a seamless online shopping experience. The project is currently **under heavy development**, and many features are yet to be implemented.

> **Note:** This README is primarily for developers contributing to this project.

## ⚠️ Project Archived 

This repository, **Trenvo**, has been **archived** and is no longer actively maintained or supported.

- The code and resources in this repository are provided **as-is**.
- No further updates, bug fixes, or feature additions will be made.
- For references or learning purposes only.

Thank you for your interest in **Trenvo**!

## 🌟 Current Features

- **Front-End:**
  - 🎨 **Landing Page:** A modern home page showcasing featured products and collections.
  - 📄 **Static Pages:** Includes "About Us" sections.
  - 🔐 **Login & Signup Pages:** Basic forms for user authentication.
  - 🛒 **Shopping & Product Pages:** Fully dynamic shopping pages for browsing products.
  - 🛍️ **Cart, Checkout, and Payment Pages:** Fully dynamic interfaces for cart review and payment methods.
  - 🧑‍💼 **Profile & Wishlist Pages:** Profile page is dynamic, while the wishlist page remains static.
  - 🚚 **Order & Track Order Pages:** Fully dynamic order tracking pages with interactive features.
  - 📞 **Contact Us Page:** Fully dynamic and integrated with the backend.
  - 🔄 **Password Reset Flow:** A secure, fully dynamic multi-step process integrated with the backend, including email and OTP verification.

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
git clone https://github.com/GitCoder052023/Trenvo.git
```

### Step 2: Navigate to the Project Directory
```bash
cd Trenvo
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

## 🌟 Testimonials

We would like to extend our gratitude to the contributors who have significantly supported the development of **Trenvo**:

- **IbrahimAhmad77977**: Played a pivotal role in making pages fully responsive, demonstrating exceptional skill and dedication. His work is highly commendable, and I rate him **5/5**.
- **huzaifazahid1**: Skillfully re-created the frontend for several pages, perfectly translating designs into functional interfaces. His talent and attention to detail are outstanding, earning a **5/5** rating.
- **royadeveloper01**: Made significant contributions to the backend architecture of Trenvo, showcasing proficiency and commitment.
- **AbdullahAhmadAAK**: Contributed extensively to ensuring the responsiveness of pages, exhibiting excellent technical skills. I rate his work **5/5**.

Your efforts and dedication are deeply appreciated! 🚀

## 🤝 Contributing

We welcome contributions from developers around the world! Follow these steps to get started:

1. **Fork the Repository:**
   - Click the "Fork" button on the top right of this repository to create your own copy.

2. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/Trenvo.git
   ```

3. **Create a Branch:**
   - Use a descriptive name for your branch that indicates the feature or bugfix you are working on:
     ```bash
     git checkout -b feature/your-feature-name
     ```

4. **Make Changes:**
   - Write clean, well-documented code.
   - Ensure that your code adheres to the project's coding guidelines.

5. **Test Your Changes:**
   - Before submitting your work, ensure that your changes are tested and do not break existing functionality.

6. **Push to Your Fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request:**
   - Go to the original repository on GitHub and create a Pull Request (PR).
   - Provide a detailed description of your changes and the motivation behind them.

8. **Collaborate:**
   - Address feedback and collaborate with reviewers to refine your PR.

By contributing to this project, you agree to abide by its [Code of Conduct](https://github.com/GitCoder052023/Trenvo/blob/main/CODE_OF_CONDUCT.md).
