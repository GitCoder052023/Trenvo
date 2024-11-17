document.addEventListener('DOMContentLoaded', () => {
    const token = window.localStorage.getItem('jwtToken');

    if (token) {
        fetch("http://localhost:8000/auth/verify-token", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Token invalid');
            }
            return response.json();
        })
        .then(data => {
            if (data.valid) {
                window.location.href = '/Shop';
            } else {
                window.localStorage.removeItem('jwtToken');
            }
        })
        .catch(error => {
            console.error('Error verifying token:', error);
            window.localStorage.removeItem('jwtToken');
        });
    }

    const buttonActions = {
        loginBtn: "/Auth/Login",
        SignupBtn: "/Auth/Register",
        shopBtn: "/Shop",
        "ShopBtn-Secendory": "/Shop",
        ExpBtn: "/shop/Collection/Categories/",
        Women: "/shop/Collection/Categories/Womens",
        Men: "/Shop/Collection/Categories/Mens",
        Accessories: "/Shop/Collection/Categories/Accessories",
    };

    // Initialize button actions
    Object.keys(buttonActions).forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener("click", () => {
                window.location.href = buttonActions[id];
            });
        }
    });

    // Scroll animations using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach((element) => {
        observer.observe(element);
    });

    // Scroll progress bar
    const progressBar = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Scroll to top button
    const scrollTopButton = document.querySelector('.scroll-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });

    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add smooth scroll behavior to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});