// Product Data
const products = [
    {
        id: 1,
        title: "Wireless Headphones",
        price: 89.99,
        image: "images/Wireless Headphones.jpg",
        category: "Electronics",
        rating: 4.5
    },
    {
        id: 2,
        title: "Smart Fitness Watch",
        price: 199.99,
        image: "images/Smart Watch.jpg",
        category: "Electronics",
        rating: 4.2
    },
    {
        id: 3,
        title: "Portable Bluetooth Speaker",
        price: 59.99,
        image: "images/bluetooth speaker.webp",
        category: "Electronics",
        rating: 4.0
    },
    {
        id: 4,
        title: "Laptop Backpack",
        price: 49.99,
        image: "images/Laptop-Backpack.webp",
        category: "Accessories",
        rating: 4.7
    },
    {
        id: 5,
        title: "Wireless Gaming Mouse",
        price: 39.99,
        image: "images/Wireless Mouse.webp",
        category: "Electronics",
        rating: 4.3
    },
    {
        id: 6,
        title: "Mechanical Keyboard",
        price: 79.99,
        image: "images/Mechanical Keyboard.webp",
        category: "Electronics",
        rating: 4.8
    },
    {
        id: 7,
        title: "1TB External SSD",
        price: 129.99,
        image: "images/1TB External SSD.jpg",
        category: "Electronics",
        rating: 4.6
    },
    {
        id: 8,
        title: "Fitness Activity Tracker",
        price: 59.99,
        image: "images/Fitness Activity Tracker.jpg",
        category: "Electronics",
        rating: 4.1
    },
    {
        id: 9,
        title: "Cotton T-Shirt",
        price: 19.99,
        image: "images/Cotton T-Shirt.webp",
        category: "Clothing",
        rating: 4.4
    },
    {
        id: 10,
        title: "Denim Jeans",
        price: 49.99,
        image: "images/Denim Jeans.jpg",
        category: "Clothing",
        rating: 4.3
    },
    {
        id: 11,
        title: "Running Shoes",
        price: 79.99,
        image: "images/Running Shoes.webp",
        category: "Footwear",
        rating: 4.7
    },
    {
        id: 12,
        title: "Stainless Steel Water Bottle",
        price: 24.99,
        image: "images/Stainless Steel Water Bottle.jpg",
        category: "Accessories",
        rating: 4.5
    },
    {
        id: 13,
        title: "Non-Stick Cooking Set",
        price: 149.99,
        image: "images/Non-Stick Cooking Set.avif",
        category: "Home & Kitchen",
        rating: 4.9
    },
    {
        id: 14,
        title: "Smart LED TV 55\"",
        price: 599.99,
        image: "images/Smart LED TV.jpg",
        category: "Electronics",
        rating: 4.8
    },
    {
        id: 15,
        title: "Wireless Earbuds",
        price: 79.99,
        image: "images/Wireless Earbuds.webp",
        category: "Electronics",
        rating: 4.2
    },
    {
        id: 16,
        title: "Yoga Mat",
        price: 29.99,
        image: "images/Yoga Mat.jpg",
        category: "Sports",
        rating: 4.6
    },
    {
        id: 17,
        title: "Digital SLR Camera",
        price: 499.99,
        image: "images/Digital SLR Camera.jpg",
        category: "Electronics",
        rating: 4.7
    },
    {
        id: 18,
        title: "Air Fryer",
        price: 89.99,
        image: "images/Air Fryer.png",
        category: "Home & Kitchen",
        rating: 4.4
    },
    {
        id: 19,
        title: "Blender",
        price: 49.99,
        image: "images/Blender.jpg",
        category: "Home & Kitchen",
        rating: 4.3
    },
    {
        id: 20,
        title: "Coffee Maker",
        price: 69.99,
        image: "images/Coffee-Maker.jpg",
        category: "Home & Kitchen",
        rating: 4.5
    }
];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartButton = document.getElementById('cart-button');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const checkoutButton = document.getElementById('checkout-button');

// Cart State
let cart = [];

// Initialize the app
function init() {
    renderProducts();
    setupEventListeners();
    updateCart();
}

// Render products to the page
function renderProducts() {
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Toggle cart sidebar
    cartButton.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    overlay.addEventListener('click', toggleCart);
    
    // Add to cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        }
        
        // Handle quantity changes and item removal
        if (e.target.classList.contains('quantity-btn')) {
            const itemId = parseInt(e.target.closest('.cart-item').getAttribute('data-id'));
            const isIncrease = e.target.classList.contains('increase');
            updateQuantity(itemId, isIncrease);
        }
        
        if (e.target.classList.contains('remove-item')) {
            const itemId = parseInt(e.target.closest('.cart-item').getAttribute('data-id'));
            removeFromCart(itemId);
        }
    });
    
    // Checkout button
    checkoutButton.addEventListener('click', checkout);
}

// Toggle cart sidebar
function toggleCart() {
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showAddToCartFeedback();
}

// Update item quantity
function updateQuantity(productId, isIncrease) {
    const item = cart.find(item => item.id === productId);
    
    if (!item) return;
    
    if (isIncrease) {
        item.quantity += 1;
    } else {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            removeFromCart(productId);
            return;
        }
    }
    
    updateCart();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update cart UI
function updateCart() {
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.setAttribute('data-id', item.id);
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-actions">
                        <button class="quantity-btn decrease">-</button>
                        <span class="cart-item-quantity">${item.quantity}</span>
                        <button class="quantity-btn increase">+</button>
                        <button class="remove-item">Remove</button>
                    </div>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
    }
    
    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
    
    // Update cart count
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
}

// Show feedback when item is added to cart
function showAddToCartFeedback() {
    const feedback = document.createElement('div');
    feedback.className = 'feedback-message';
    feedback.textContent = 'Item added to cart!';
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        feedback.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(feedback);
        }, 300);
    }, 2000);
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    alert(`Thank you for your order! Total: $${cartTotal.textContent}`);
    cart = [];
    updateCart();
    toggleCart();
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);