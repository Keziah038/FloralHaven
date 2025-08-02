// 🌸 Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// 🌸 Mobile Navigation
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// 🌸 Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// 🌸 Flower Data
const flowers = [
    {
        id: 1,
        name: "Kerala Jasmine",
        price: 199,
        desc: "Traditional Mullapoo with sweet fragrance, perfect for weddings and temples",
        image: "Jasmine.png",
        subscription: true,
        type: "flower"
    },
    {
        id: 2,
        name: "Marigold Garland",
        price: 299,
        desc: "Bright orange marigold flowers strung into beautiful malas",
        image: "marigold.png",
        subscription: true,
        type: "flower"
    },
    {
        id: 3,
        name: "Hibiscus Arrangement",
        price: 349,
        desc: "Vibrant red hibiscus flowers for pooja and decorations",
        image: "Hobi.png",
        subscription: false,
        type: "flower"
    },
    {
        id: 4,
        name: "Orchid Bouquet",
        price: 899,
        desc: "Exotic orchids arranged in an elegant bouquet",
        image: "Orchid.png",
        subscription: false,
        type: "flower"
    },
    {
        id: 5,
        name: "Rose Basket",
        price: 599,
        desc: "Two dozen fresh roses in a decorative basket",
        image: "rose.png",
        subscription: true,
        type: "flower"
    },
    {
        id: 6,
        name: "Kerala Lily Centerpiece",
        price: 749,
        desc: "White lilies with tropical greens for table centerpieces",
        image: "Lily.png",
        subscription: false,
        type: "flower"
    }
];

// 🌸 Product Data
const products = [
    {
        id: 7,
        name: "Wedding Flower Package",
        price: 4999,
        desc: "Complete floral decorations for weddings including mandapam, stage and aisle",
        image: "pack.png",
        type: "product"
    },
    {
        id: 8,
        name: "Traditional Pookalam Kit",
        price: 1299,
        desc: "Everything you need to create beautiful Onam pookalam designs",
        image: "kit.png",
        type: "product"
    },
    {
        id: 9,
        name: "Floral Gift Box",
        price: 899,
        desc: "Luxury gift box with fresh flowers and chocolates",
        image: "gift.png",
        type: "product"
    },
    {
        id: 10,
        name: "Monthly Flower Subscription",
        price: 1999,
        desc: "Fresh flowers delivered to your home every week",
        image: "Month.png",
        type: "product"
    },
    {
        id: 11,
        name: "Ceramic Flower Vase",
        price: 1499,
        desc: "Handcrafted Kerala-style ceramic vase for floral arrangements",
        image: "vase.png",
        type: "product"
    },
    {
        id: 12,
        name: "Festival Special Package",
        price: 2999,
        desc: "Complete floral decorations for Vishu, Onam and other festivals",
        image: "fes.png",
        type: "product"
    }
];

// 🌸 Initialize Swiper for Flower Gallery
const flowerSwiper = new Swiper('.flower-gallery', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        }
    }
});

// 🌸 Populate Flower Gallery
const flowerGallery = document.querySelector('.flower-gallery .swiper-wrapper');

flowers.forEach(flower => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
        <div class="flower-card">
            <img src="${flower.image}" alt="${flower.name}">
            <div class="flower-card-content">
                <h3>${flower.name}</h3>
                <p>${flower.desc}</p>
                <span class="price">₹${flower.price.toFixed(2)}</span>
                <button class="btn btn-primary select-item" data-id="${flower.id}" data-type="${flower.type}">
                    ${flower.subscription ? 'Subscribe' : 'Add to Cart'}
                </button>
                ${flower.subscription ? '<span class="subscription-badge"><i class="fas fa-calendar-check"></i> Subscription</span>' : ''}
            </div>
        </div>
    `;
    flowerGallery.appendChild(slide);
});

// 🌸 Populate Product Grid
const productGrid = document.querySelector('.product-grid');

products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-card-content">
            <h3>${product.name}</h3>
            <p>${product.desc}</p>
            <span class="price">₹${product.price.toFixed(2)}</span>
            <button class="btn btn-primary select-item" data-id="${product.id}" data-type="${product.type}">
                Add to Cart
            </button>
        </div>
    `;
    productGrid.appendChild(productCard);
});

// 🌸 Shopping Cart Functionality
const cart = [];
const cartIcon = document.querySelector('.cart-icon');
const cartDropdown = document.querySelector('.cart-dropdown');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const cartTotal = document.querySelector('.total-amount');

// Toggle cart dropdown
cartIcon.addEventListener('click', () => {
    cartDropdown.classList.toggle('show');
});

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.cart') && !e.target.closest('.cart-dropdown')) {
        cartDropdown.classList.remove('show');
    }
});

// Add to cart functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('select-item')) {
        const id = parseInt(e.target.dataset.id);
        const type = e.target.dataset.type;
        const items = type === 'flower' ? flowers : products;
        const item = items.find(item => item.id === id);
        
        addToCart(item);
    }
    
    // Remove item from cart
    if (e.target.classList.contains('remove-item') || e.target.parentElement.classList.contains('remove-item')) {
        const id = parseInt(e.target.dataset.id || e.target.parentElement.dataset.id);
        removeFromCart(id);
    }
});

// Checkout button
document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Proceeding to checkout. Total: ₹${total.toFixed(2)}\nThank you for your order!`);
    cart.length = 0;
    updateCart();
    cartDropdown.classList.remove('show');
});

function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1
        });
    }
    
    updateCart();
    cartDropdown.classList.add('show');
    
    // Pulse animation for cart icon
    cartIcon.style.animation = 'pulse 0.5s ease';
    setTimeout(() => {
        cartIcon.style.animation = '';
    }, 500);
}

function removeFromCart(id) {
    const index = cart.findIndex(item => item.id === id);
    
    if (index !== -1) {
        cart.splice(index, 1);
        updateCart();
    }
}

function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
    
    // Render cart items
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>₹${item.price.toFixed(2)} × ${item.quantity}</p>
            </div>
            <button class="remove-item" data-id="${item.id}"><i class="fas fa-times"></i></button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}

// 🌸 Booking System
let selectedItem = null;

// Item selection for booking preview
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('select-item')) {
        const id = parseInt(e.target.dataset.id);
        const type = e.target.dataset.type;
        const items = type === 'flower' ? flowers : products;
        selectedItem = items.find(item => item.id === id);
        updatePreview(selectedItem);
    }
});

function updatePreview(item) {
    const previewImage = document.querySelector('#preview-item');
    const img = previewImage.querySelector('img') || document.createElement('img');
    
    img.src = item.image;
    img.alt = item.name;
    
    if (!previewImage.contains(img)) {
        previewImage.innerHTML = '';
        previewImage.appendChild(img);
    }
    
    document.getElementById('preview-name').textContent = item.name;
    document.getElementById('preview-desc').textContent = item.desc;
    document.getElementById('preview-price').textContent = item.price.toFixed(2);
}

// Booking form submission
const bookingForm = document.getElementById('delivery-form');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!selectedItem) {
        alert('Please select an item first!');
        return;
    }
    
    const formData = {
        item: selectedItem.name,
        date: document.getElementById('delivery-date').value,
        time: document.getElementById('delivery-time').value,
        recipient: document.getElementById('recipient').value,
        message: document.getElementById('message').value,
        price: selectedItem.price
    };
    
    console.log('Booking submitted:', formData);
    alert(`Booking confirmed! ${selectedItem.name} will be delivered on ${formData.date} between ${formData.time}.`);
    
    // Reset form
    bookingForm.reset();
    selectedItem = null;
    document.querySelector('#preview-item').innerHTML = '<p>Select an item to preview</p>';
    document.getElementById('preview-name').textContent = 'No selection yet';
    document.getElementById('preview-desc').textContent = 'Choose from our collection';
    document.getElementById('preview-price').textContent = '0.00';
});

// Initialize date picker with min date (today)
const today = new Date().toISOString().split('T')[0];
document.getElementById('delivery-date').min = today;

// 🌸 AR Viewer
document.querySelector('.ar-btn').addEventListener('click', () => {
    document.querySelector('.ar-viewer').style.display = 'flex';
});

document.querySelector('.close-ar').addEventListener('click', () => {
    document.querySelector('.ar-viewer').style.display = 'none';
});

// AR CTA button
document.querySelector('.ar-cta').addEventListener('click', () => {
    alert('Thank you! We will notify you when our AR flower viewer is ready.');
    document.querySelector('.ar-viewer').style.display = 'none';
});

// 🌸 Scroll Animation
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.flower-card, .product-card, .contact-card, .gallery-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize elements for animation
window.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.flower-card, .product-card, .contact-card, .gallery-item');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelector('.hero-title').style.animation = 'fadeInUp 1s ease forwards';
        document.querySelector('.hero-subtitle').style.animation = 'fadeInUp 1s ease 0.2s forwards';
        document.querySelector('.hero-buttons').style.animation = 'fadeInUp 1s ease 0.4s forwards';
        document.querySelector('.hero-image').style.animation = 'fadeIn 1s ease 0.6s forwards';
    }, 300);
});

// Run animation check on scroll
window.addEventListener('scroll', animateOnScroll);

// Initialize cart
updateCart();

// 🌸 Aesthetic Celebrations Gallery
const floralCelebrations = [
    {
        title: "Traditional Kerala Wedding",
        image: "Traditional.png",
        description: "Elegant floral mandapam with jasmine and marigold garlands",
        occasion: "Wedding",
        flowers: ["Jasmine", "Marigold", "Orchids"]
    },

    {
        title: "Church Wedding Arch",
        image: "images/gallery/church-wedding.jpg",
        description: "Grand white floral arch with roses and lilies for Christian weddings",
        occasion: "Wedding",
        flowers: ["White Roses", "Lilies", "Baby's Breath"]
    },
    {
        title: "Vishu Kani Arrangement",
        image: "images/gallery/vishu-arrangement.jpg",
        description: "Traditional golden floral display for Vishu new year",
        occasion: "Vishu",
        flowers: ["Golden Marigold", "Yellow Roses", "Tulsi"]
    }
];

const galleryContainer = document.querySelector('.gallery-grid');

floralCelebrations.forEach(item => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.innerHTML = `
        <div class="gallery-card">
            <div class="gallery-image">
                <img src="${item.image}" alt="${item.title}">
                <div class="flower-tags">
                    ${item.flowers.map(flower => `<span class="flower-tag">${flower}</span>`).join('')}
                </div>
            </div>
            <div class="gallery-info">
                <span class="occasion-badge">${item.occasion}</span>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <button class="btn btn-inquire">Inquire About This Design</button>
            </div>
        </div>
    `;
    galleryContainer.appendChild(galleryItem);
});