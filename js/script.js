document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Server IP copy function
    window.copyServerIP = function() {
        const serverIP = document.getElementById('serverIP');
        if (serverIP) {
            const textArea = document.createElement('textarea');
            textArea.value = serverIP.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            alert('Server IP wurde in die Zwischenablage kopiert!');
        }
    };
    
    // Admin panel functionality
    function setupAdminLogin() {
        const adminLoginForm = document.getElementById('adminLoginForm');
        const adminPanel = document.getElementById('adminPanel');
        const adminLogin = document.getElementById('adminLogin');
        
        if (adminLoginForm) {
            console.log('Admin Login Formular gefunden');
            
            adminLoginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                console.log('Login-Formular abgesendet');
                
                const username = document.getElementById('adminUsername').value;
                const password = document.getElementById('adminPassword').value;
                
                console.log('Anmeldedaten überprüfen:', username);
                
                // Simple admin authentication (in a real site, this would be server-side)
                if (username === 'admin' && password === 'admin123') {
                    console.log('Anmeldung erfolgreich');
                    adminPanel.style.display = 'block';
                    adminLogin.style.display = 'none';
                } else {
                    alert('Falsche Zugangsdaten. Bitte versuche es erneut.');
                }
            });
        } else {
            console.log('Admin Login Formular nicht gefunden');
        }
    }
    
    // Führe Admin-Login-Setup aus
    setupAdminLogin();
    
    // Admin tabs functionality
    const adminTabs = document.querySelectorAll('.admin-tab');
    const adminContents = document.querySelectorAll('.admin-content');
    
    if (adminTabs.length > 0) {
        adminTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                adminTabs.forEach(t => t.classList.remove('active'));
                adminContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                tab.classList.add('active');
                const contentId = tab.getAttribute('data-tab');
                document.getElementById(contentId).classList.add('active');
            });
        });
    }
    
    // Shop item management
    const shopItemForm = document.getElementById('shopItemForm');
    const shopItemsList = document.getElementById('shopItemsList');
    
    if (shopItemForm) {
        shopItemForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('itemTitle').value;
            const description = document.getElementById('itemDescription').value;
            const price = document.getElementById('itemPrice').value;
            const imageUrl = document.getElementById('itemImage').value || 'img/placeholder.jpg';
            
            const shopItem = document.createElement('div');
            shopItem.className = 'admin-item';
            shopItem.innerHTML = `
                <div class="admin-item-details">
                    <h4>${title}</h4>
                    <p>${description}</p>
                    <p class="shop-item-price">${price} €</p>
                </div>
                <div class="admin-item-actions">
                    <button class="btn" onclick="editShopItem(this)">Bearbeiten</button>
                    <button class="btn delete-btn" onclick="deleteShopItem(this)">Löschen</button>
                </div>
            `;
            
            shopItemsList.appendChild(shopItem);
            shopItemForm.reset();
            
            // Also add to the shop page if it exists
            updateShopItems();
        });
    }
    
    // Rules management
    const ruleForm = document.getElementById('ruleForm');
    const rulesList = document.getElementById('rulesList');
    
    if (ruleForm) {
        ruleForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const section = document.getElementById('ruleSection').value;
            const rule = document.getElementById('ruleText').value;
            
            const ruleItem = document.createElement('div');
            ruleItem.className = 'admin-item';
            ruleItem.innerHTML = `
                <div class="admin-item-details">
                    <h4>${section}</h4>
                    <p>${rule}</p>
                </div>
                <div class="admin-item-actions">
                    <button class="btn" onclick="editRule(this)">Bearbeiten</button>
                    <button class="btn delete-btn" onclick="deleteRule(this)">Löschen</button>
                </div>
            `;
            
            rulesList.appendChild(ruleItem);
            ruleForm.reset();
            
            // Also add to the rules page if it exists
            updateRules();
        });
    }
    
    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            adminPanel.style.display = 'none';
            adminLogin.style.display = 'block';
            document.getElementById('adminLoginForm').reset();
        });
    }
});

// Shop management functions
function updateShopItems() {
    // This function would update the shop page with the items from the admin panel
    // In a real website, this would involve database operations
    console.log('Shop items updated');
    
    // For demo purposes, we'll save to localStorage
    const shopItems = document.querySelectorAll('#shopItemsList .admin-item');
    const items = [];
    
    shopItems.forEach(item => {
        const title = item.querySelector('h4').textContent;
        const description = item.querySelector('p:not(.shop-item-price)').textContent;
        const price = item.querySelector('.shop-item-price').textContent;
        
        items.push({
            title,
            description,
            price,
            image: 'img/placeholder.jpg' // Placeholder for demo
        });
    });
    
    localStorage.setItem('shopItems', JSON.stringify(items));
}

function deleteShopItem(button) {
    if (confirm('Bist du sicher, dass du diesen Shop-Artikel löschen möchtest?')) {
        button.closest('.admin-item').remove();
        updateShopItems();
    }
}

function editShopItem(button) {
    const item = button.closest('.admin-item');
    const title = item.querySelector('h4').textContent;
    const description = item.querySelector('p:not(.shop-item-price)').textContent;
    const price = item.querySelector('.shop-item-price').textContent.replace(' €', '');
    
    document.getElementById('itemTitle').value = title;
    document.getElementById('itemDescription').value = description;
    document.getElementById('itemPrice').value = price;
    
    // Remove the item as we're editing it
    item.remove();
    updateShopItems();
}

// Rules management functions
function updateRules() {
    // This function would update the rules page with the rules from the admin panel
    // In a real website, this would involve database operations
    console.log('Rules updated');
    
    // For demo purposes, we'll save to localStorage
    const ruleItems = document.querySelectorAll('#rulesList .admin-item');
    const rules = [];
    
    ruleItems.forEach(item => {
        const section = item.querySelector('h4').textContent;
        const rule = item.querySelector('p').textContent;
        
        rules.push({
            section,
            rule
        });
    });
    
    localStorage.setItem('rules', JSON.stringify(rules));
}

function deleteRule(button) {
    if (confirm('Bist du sicher, dass du diese Regel löschen möchtest?')) {
        button.closest('.admin-item').remove();
        updateRules();
    }
}

function editRule(button) {
    const item = button.closest('.admin-item');
    const section = item.querySelector('h4').textContent;
    const rule = item.querySelector('p').textContent;
    
    document.getElementById('ruleSection').value = section;
    document.getElementById('ruleText').value = rule;
    
    // Remove the item as we're editing it
    item.remove();
    updateRules();
}

// Load shop items if they exist
function loadShopItems() {
    const shopContainer = document.querySelector('.shop-container');
    if (!shopContainer) return;
    
    const items = JSON.parse(localStorage.getItem('shopItems') || '[]');
    
    items.forEach(item => {
        const shopItem = document.createElement('div');
        shopItem.className = 'shop-item';
        shopItem.innerHTML = `
            <div class="shop-item-image">
                <img src="${item.image}" alt="${item.title}" onerror="this.src='img/placeholder.jpg'">
            </div>
            <div class="shop-item-content">
                <h3 class="shop-item-title">${item.title}</h3>
                <p class="shop-item-description">${item.description}</p>
                <p class="shop-item-price">${item.price}</p>
                <a href="#" class="btn shop-item-button">Kaufen</a>
            </div>
        `;
        
        shopContainer.appendChild(shopItem);
    });
}

// Load rules if they exist
function loadRules() {
    const rulesContainer = document.querySelector('.rules-container');
    if (!rulesContainer) return;
    
    const rules = JSON.parse(localStorage.getItem('rules') || '[]');
    
    // Group rules by section
    const sections = {};
    rules.forEach(rule => {
        if (!sections[rule.section]) {
            sections[rule.section] = [];
        }
        sections[rule.section].push(rule.rule);
    });
    
    // Create sections
    for (const section in sections) {
        const sectionEl = document.createElement('div');
        sectionEl.className = 'rule-section';
        sectionEl.innerHTML = `
            <h3>${section}</h3>
            <ol class="rule-list">
                ${sections[section].map(rule => `<li>${rule}</li>`).join('')}
            </ol>
        `;
        
        rulesContainer.appendChild(sectionEl);
    }
}

// Kontaktformular-Funktion
window.sendContactForm = function() {
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    
    // Validierung
    if (!name || !email || !subject || !message) {
        alert('Bitte fülle alle Felder aus.');
        return;
    }
    
    // E-Mail-Validierung
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Bitte gib eine gültige E-Mail-Adresse ein.');
        return;
    }
    
    // In einer echten Anwendung würden die Daten hier per AJAX an einen Server gesendet
    // Für die Demo zeigen wir nur eine Erfolgsbenachrichtigung
    alert(`Vielen Dank für deine Nachricht, ${name}! Wir werden uns so schnell wie möglich bei dir melden.`);
    
    // Formular zurücksetzen
    document.getElementById('contactForm').reset();
};

// Admin Login Funktion
window.loginAdmin = function() {
    console.log('Login-Funktion aufgerufen');
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    const adminPanel = document.getElementById('adminPanel');
    const adminLogin = document.getElementById('adminLogin');
    
    if (username === 'admin' && password === 'admin123') {
        console.log('Anmeldung erfolgreich');
        adminPanel.style.display = 'block';
        adminLogin.style.display = 'none';
    } else {
        alert('Falsche Zugangsdaten. Bitte versuche es erneut.');
    }
};

// Initialize shop and rules on page load
document.addEventListener('DOMContentLoaded', function() {
    loadShopItems();
    loadRules();
    
    // Update player count for demo purposes
    const playerCount = document.getElementById('playerCount');
    const playerBar = document.getElementById('playerBar');
    const maxPlayers = document.getElementById('maxPlayers');
    
    if (playerCount && playerBar && maxPlayers) {
        const max = parseInt(maxPlayers.textContent);
        const current = Math.floor(Math.random() * max);
        playerCount.textContent = current;
        playerBar.style.width = (current / max * 100) + '%';
    }
});
