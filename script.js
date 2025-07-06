// Login Functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username === 'Haidarazfa120202' && password === 'Admin120202') {
                window.location.href = 'admin.html';
            } else {
                alert('Username atau password salah!');
            }
        });
    }
    
    // Admin Page Functionality
    const itemForm = document.getElementById('itemForm');
    const etalase = document.getElementById('etalase');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
    
    if (itemForm && etalase) {
        // Load existing items from localStorage
        loadItems();
        
        itemForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const itemName = document.getElementById('itemName').value;
            const itemPrice = document.getElementById('itemPrice').value;
            const itemImage = document.getElementById('itemImage').value;
            
            addItem(itemName, itemPrice, itemImage);
            itemForm.reset();
        });
    }
});

function addItem(name, price, imageUrl) {
    const items = JSON.parse(localStorage.getItem('frozenFoodItems')) || [];
    
    const newItem = {
        id: Date.now(),
        name,
        price,
        imageUrl
    };
    
    items.push(newItem);
    localStorage.setItem('frozenFoodItems', JSON.stringify(items));
    loadItems();
}

function loadItems() {
    const etalase = document.getElementById('etalase');
    if (!etalase) return;
    
    const items = JSON.parse(localStorage.getItem('frozenFoodItems')) || [];
    
    etalase.innerHTML = '';
    
    items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        itemCard.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Rp${item.price}</p>
        `;
        etalase.appendChild(itemCard);
    });
}
