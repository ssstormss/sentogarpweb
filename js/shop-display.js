document.addEventListener('DOMContentLoaded', function() {
    // Standard-Demo-Daten für den Shop
    const demoShopItems = [
        {
            id: '1',
            title: 'derzeit nix verfügbar',
            description: 'derzeit ist nix verfügrbar.',
            price: '€',
            image: ''
        },
    ];

    // Elemente aus dem DOM holen
    const shopContainer = document.getElementById('shopItemsContainer');
    const noItemsMessage = document.getElementById('noItemsMessage');
    
    // Funktion zum Laden der Shop-Items
    function loadShopItems() {
        // Hole Items aus LocalStorage
        let items = JSON.parse(localStorage.getItem('shopItems') || '[]');
        
        // Wenn keine Items im LocalStorage sind, verwende Demo-Daten
        if (items.length === 0) {
            items = demoShopItems;
            // Speichere Demo-Daten im LocalStorage
            localStorage.setItem('shopItems', JSON.stringify(demoShopItems));
        }
        
        displayShopItems(items);
    }
    
    // Funktion zum Anzeigen der Shop-Items
    function displayShopItems(items) {
        
        // Container leeren
        if (shopContainer) {
            shopContainer.innerHTML = '';
            
            // Verstecke die 'Keine Artikel' Nachricht
            if (noItemsMessage) {
                noItemsMessage.style.display = 'none';
            }
            
            // Artikel hinzufügen
            items.forEach(item => {
                const shopItem = document.createElement('div');
                shopItem.className = 'shop-item';
                shopItem.innerHTML = `
                    <div class="shop-item-image">
                        <img src="${item.image}" alt="${item.title}" onerror="this.src='img/placeholder.svg'">
                    </div>
                    <div class="shop-item-content">
                        <h3 class="shop-item-title">${item.title}</h3>
                        <p class="shop-item-description">${item.description}</p>
                        <p class="shop-item-price">${item.price}</p>
                        <a href="#" class="btn shop-item-button" data-item="${item.title}">Kaufen</a>
                    </div>
                `;
                
                shopContainer.appendChild(shopItem);
                
                // Kaufen-Button mit Event-Listener versehen
                const buyButton = shopItem.querySelector('.shop-item-button');
                buyButton.addEventListener('click', handlePurchase);
            });
        }
    }
    
    // Führe die Funktion aus, um die Shop-Artikel zu laden
    loadShopItems();
    
    // Funktion für den Kauf-Prozess
    function handlePurchase(e) {
        e.preventDefault();
        
        // Hole den Artikelnamen, falls verfügbar
        const itemName = this.getAttribute('data-item') || this.closest('.shop-item').querySelector('.shop-item-title').textContent;
        
        // Zeige Kaufdialog mit Discord-Hinweis
        showPurchaseDialog(itemName);
    }
    
    // Kaufdialog anzeigen
    function showPurchaseDialog(itemName) {
        // Erstelle den Dialog
        const dialogOverlay = document.createElement('div');
        dialogOverlay.className = 'purchase-overlay';
        
        const dialogBox = document.createElement('div');
        dialogBox.className = 'purchase-dialog';
        dialogBox.innerHTML = `
            <h3>Artikel kaufen: ${itemName}</h3>
            <p>Um diesen Artikel zu kaufen, öffne bitte ein Ticket auf unserem Discord-Server.</p>
            <p class="discord-info"><i class="fab fa-discord"></i> discord.gg/sentago</p>
            <p>Ein Administrator wird sich dann um deine Bestellung kümmern.</p>
            <div class="dialog-buttons">
                <button class="btn">Verstanden</button>
            </div>
        `;
        
        dialogOverlay.appendChild(dialogBox);
        document.body.appendChild(dialogOverlay);
        
        // Schließen-Button Funktion
        const closeButton = dialogBox.querySelector('.btn');
        closeButton.addEventListener('click', function() {
            document.body.removeChild(dialogOverlay);
        });
        
        // Schließen bei Klick außerhalb des Dialogs
        dialogOverlay.addEventListener('click', function(e) {
            if (e.target === dialogOverlay) {
                document.body.removeChild(dialogOverlay);
            }
        });
    }
    
    // Füge CSS für den Dialog hinzu
    const dialogStyle = document.createElement('style');
    dialogStyle.textContent = `
        .purchase-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .purchase-dialog {
            background-color: white;
            border-radius: 10px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        }
        
        .purchase-dialog h3 {
            color: var(--primary-color);
            margin-top: 0;
        }
        
        .discord-info {
            background-color: #5865F2;
            color: white;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
            margin: 15px 0;
        }
        
        .dialog-buttons {
            text-align: center;
            margin-top: 20px;
        }
        
        .dialog-buttons .btn {
            min-width: 120px;
        }
    `;
    
    document.head.appendChild(dialogStyle);
    
    // Event-Listener für bestehende Kauf-Buttons hinzufügen
    const existingBuyButtons = document.querySelectorAll('.shop-item-button');
    existingBuyButtons.forEach(button => {
        button.addEventListener('click', handlePurchase);
    });
});
