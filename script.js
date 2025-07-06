// Generate dummy items for etalase
function generateItems() {
    const grid = document.querySelector('.grid-etalase');
    const items = [
        'Fish Fillet', 'Chicken Nugget', 'Shrimp Ball', 
        'Beef Patty', 'Vegetable Mix', 'Fruit Blend',
        'Crab Stick', 'Squid Ring', 'Scallop'
    ];

    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'grid-item';
        div.textContent = item;
        grid.appendChild(div);
    });
}

// Login Modal Functionality
function setupLogin() {
    const loginBtn = document.getElementById('loginBtn');
    const modal = document.getElementById('loginModal');
    const closeBtn = document.querySelector('.close-modal');
    const loginForm = document.getElementById('loginForm');

    // Open modal
    loginBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Login validation
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'Haidarazfa120202' && password === 'Admin120202') {
            window.location.href = 'admin.html';
        } else {
            alert('Invalid credentials! Try again.');
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    generateItems();
    setupLogin();
});
