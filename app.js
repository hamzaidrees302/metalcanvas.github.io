
let cart = JSON.parse(localStorage.getItem('metalcanvas_cart')) || [];

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    renderProducts();
    renderCart();
});

function updateCartBadge() {
    const badge = document.getElementById('cart-count');
    if (badge) badge.innerText = cart.length;
}

function renderProducts() {
    const featuredGrid = document.getElementById('featured-grid');
    const fullGrid = document.getElementById('full-product-grid');

    if (featuredGrid) {
        const featuredItems = products.filter(p => p.featured);
        featuredGrid.innerHTML = featuredItems.map(p => createProductCard(p)).join('');
    }

    if (fullGrid) {
        fullGrid.innerHTML = products.map(p => createProductCard(p)).join('');
    }
}

function createProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">Rs. ${product.price.toLocaleString()}</p>
                <button onclick="addToCart(${product.id})" class="btn btn-primary" style="width:100%">Add to Cart</button>
            </div>
        </div>
    `;
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem('metalcanvas_cart', JSON.stringify(cart));
    updateCartBadge();
    alert(product.name + " added to your basket!");
}

function renderCart() {
    const cartList = document.getElementById('cart-items-list');
    const summary = document.getElementById('cart-summary-box');
    if (!cartList) return;

    if (cart.length === 0) {
        cartList.innerHTML = "<p>Your basket is empty. Go shop some art!</p>";
        summary.style.display = "none";
        return;
    }

    cartList.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div>
                <h4>${item.name}</h4>
                <p style="color:var(--primary-accent)">Rs. ${item.price.toLocaleString()}</p>
            </div>
            <button onclick="removeFromCart(${index})" class="btn btn-secondary" style="padding: 5px 15px; border-color: #ef4444; color: #ef4444;">Remove</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('total-val').innerText = total.toLocaleString();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('metalcanvas_cart', JSON.stringify(cart));
    renderCart();
    updateCartBadge();
}

function checkoutToWhatsApp() {
    const phone = "923000000000"; // Replace with your actual WhatsApp number
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const itemNames = cart.map(i => i.name).join(', ');
    
    const message = `Hello MetalCanvas! I would like to place an order:%0A%0AItems: ${itemNames}%0A%0ATotal Price: Rs. ${total.toLocaleString()}%0A%0APlease let me know the delivery details.`;
    
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}
