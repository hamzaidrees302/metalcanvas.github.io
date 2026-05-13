
let cart = JSON.parse(localStorage.getItem('metal_cart')) || [];

function updateBadge() {
    const b = document.getElementById('cart-count');
    if(b) b.innerText = cart.length;
}

function renderHome() {
    const list = document.getElementById('product-list');
    if(!list) return;
    list.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.image}">
            <div class="product-info">
                <h3>${p.name}</h3>
                <p class="price">Rs. ${p.price}</p>
                <button class="btn btn-primary" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function addToCart(id) {
    const p = products.find(x => x.id === id);
    cart.push(p);
    localStorage.setItem('metal_cart', JSON.stringify(cart));
    updateBadge();
    alert("Added to cart!");
}

function renderCart() {
    const inv = document.getElementById('invoice-items');
    if(!inv) return;
    if(cart.length === 0) {
        inv.innerHTML = "Your cart is empty.";
        return;
    }
    let total = cart.reduce((s, i) => s + i.price, 0);
    inv.innerHTML = cart.map(i => `<div class="cart-item"><span>${i.name}</span><span>Rs. ${i.price}</span></div>`).join('') +
                    `<div class="cart-item"><strong>TOTAL</strong><strong>Rs. ${total}</strong></div>`;
}

function sendOrder() {
    const name = document.getElementById('cust-name').value;
    const addr = document.getElementById('cust-addr').value;
    const pay = document.getElementById('pay-method').value;

    if(!name || !addr) return alert("Please enter your details");

    let total = cart.reduce((s, i) => s + i.price, 0);
    let items = cart.map(i => `- ${i.name}`).join('%0A');

    const msg = `*METAL CANVAS ORDER*%0A%0A*Customer:* ${name}%0A*Address:* ${addr}%0A*Payment:* ${pay}%0A%0A*Items:*%0A${items}%0A%0A*Total:* Rs. ${total}`;
    
    window.open(`https://wa.me/${contactInfo.whatsapp}?text=${msg}`);
    localStorage.removeItem('metal_cart');
}

document.addEventListener('DOMContentLoaded', () => {
    updateBadge();
    renderHome();
    renderCart();
});
