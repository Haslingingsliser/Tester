// Global Variables
const PRODUCTS_KEY = 'frozenfood_products';

// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const modal = document.getElementById('loginModal');
const closeBtn = document.querySelector('.close');
const loginForm = document.getElementById('loginForm');
const productForm = document.getElementById('productForm');
const productGrid = document.getElementById('productGrid');
const adminProductGrid = document.getElementById('adminProductGrid');
const logoutBtn = document.getElementById('logoutBtn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load products for public view
    if (productGrid) {
        loadProducts(false);
    }
    
    // Load products for admin view
    if (adminProductGrid) {
        loadProducts(true);
    }
    
    // Setup login modal if exists
    if (loginBtn && modal) {
        setupLoginModal();
    }
    
    // Setup product form if exists
    if (productForm) {
        setupProductForm();
    }
    
    // Setup logout if exists
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isAdmin');
            window.location.href = 'index.html';
        });
    }
});

// Functions
function setupLoginModal() {
    // Open modal
    loginBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Login validation
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'Haidarazfa120202' && password === 'Admin120202') {
            localStorage.setItem('isAdmin', 'true');
            window.location.href = 'admin.html';
        } else {
            alert('Invalid credentials! Username: Haidarazfa120202\nPassword: Admin120202');
        }
    });
}

function setupProductForm() {
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const product = {
            id: Date.now(),
            name: document.getElementById('productName').value,
            price: document.getElementById('productPrice').value,
            image: document.getElementById('productImage').value,
            desc: document.getElementById('productDesc').value || 'No description'
        };
        
        addProduct(product);
        productForm.reset();
    });
}

function addProduct(product) {
    const products = getProducts();
    products.push(product);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    loadProducts(true);
}

function getProducts() {
    return JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
}

function loadProducts(isAdminView) {
    const products = getProducts();
    const grid = isAdminView ? adminProductGrid : productGrid;
    
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (products.length === 0) {
        grid.innerHTML = '<p class="no-products">No products available</p>';
        return;
    }
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        if (isAdminView) {
            productCard.innerHTML = `
                <div class="product-image" style="background-image: url('${product.image}')"></div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">$${product.price}</p>
                    <p>${product.desc}</p>
                    <button class="delete-btn" data-id="${product.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            `;
        } else {
            productCard.innerHTML = `
                <div class="product-image" style="background-image: url('${product.image}')"></div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">$${product.price}</p>
                </div>
            `;
        }
        
        grid.appendChild(productCard);
    });
    
    // Add event listeners for delete buttons
    if (isAdminView) {
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.closest('.delete-btn').dataset.id);
                deleteProduct(id);
            });
        });
    }
}

function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    const products = getProducts().filter(product => product.id !== id);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    loadProducts(true);
}

// Check admin access
function checkAdminAccess() {
    if (window.location.pathname.includes('admin.html') && 
        localStorage.getItem('isAdmin') !== 'true') {
        window.location.href = 'index.html';
    }
}

// Run admin check
checkAdminAccess();
