// Data storage
let stockItems = [];
let currentFilter = 'all';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    renderStockList();
    updateReports();
    
    // Add sample data if empty
    if (stockItems.length === 0) {
        addSampleData();
    }
});

// Tab navigation
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    
    // Remove active from all nav tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
    
    // Update reports when switching to reports tab
    if (tabName === 'reports') {
        updateReports();
    }
}

// Add new item
function addNewItem() {
    const name = document.getElementById('itemName').value.trim();
    const category = document.getElementById('itemCategory').value;
    const unit = document.getElementById('itemUnit').value.trim();
    const minStock = parseInt(document.getElementById('itemMinStock').value) || 0;
    const maxStock = parseInt(document.getElementById('itemMaxStock').value) || 100;

    if (!name || !unit) {
        alert('Please fill in item name and unit');
        return;
    }

    const newItem = {
        id: Date.now(),
        name: name,
        category: category,
        unit: unit,
        currentStock: 0,
        minStock: minStock,
        maxStock: maxStock,
        lastUpdated: new Date().toISOString()
    };

    stockItems.push(newItem);
    saveData();
    renderStockList();
    updateReports();

    // Clear form
    document.getElementById('itemName').value = '';
    document.getElementById('itemUnit').value = '';
    document.getElementById('itemMinStock').value = '';
    document.getElementById('itemMaxStock').value = '';

    alert('Item added successfully!');
}

// Add sample data
function addSampleData() {
    const actualInventory = [
        // Powder items
        {id: 1, name: 'Mango Powder', category: 'powder', unit: 'packs', currentStock: 2, minStock: 2, maxStock: 4, lastUpdated: new Date().toISOString()},
        {id: 2, name: 'Strawberry Powder', category: 'powder', unit: 'packs', currentStock: 1.5, minStock: 2, maxStock: 4, lastUpdated: new Date().toISOString()},
        {id: 3, name: 'Avocado Powder', category: 'powder', unit: 'packs', currentStock: 0.8, minStock: 2, maxStock: 4, lastUpdated: new Date().toISOString()},
        {id: 4, name: 'Milk Powder', category: 'powder', unit: 'packs', currentStock: 1, minStock: 0.2, maxStock: 1, lastUpdated: new Date().toISOString()},
        {id: 5, name: 'Taro Powder', category: 'powder', unit: 'packs', currentStock: 1.2, minStock: 1, maxStock: 4, lastUpdated: new Date().toISOString()},
        {id: 6, name: 'Coconut Powder', category: 'powder', unit: 'packs', currentStock: 1, minStock: 1, maxStock: 2, lastUpdated: new Date().toISOString()},
        {id: 7, name: 'Banana Powder', category: 'powder', unit: 'packs', currentStock: 1, minStock: 1, maxStock: 2, lastUpdated: new Date().toISOString()},
        
        // Syrup items
        {id: 8, name: 'Brown Sugar Syrup', category: 'syrup', unit: 'bottles', currentStock: 3, minStock: 4, maxStock: 8, lastUpdated: new Date().toISOString()},
        {id: 9, name: 'Mango Syrup', category: 'syrup', unit: 'bottles', currentStock: 2, minStock: 4, maxStock: 8, lastUpdated: new Date().toISOString()},
        {id: 10, name: 'Strawberry Syrup', category: 'syrup', unit: 'bottles', currentStock: 1, minStock: 4, maxStock: 8, lastUpdated: new Date().toISOString()},
        {id: 11, name: 'Green Apple Syrup', category: 'syrup', unit: 'bottles', currentStock: 2, minStock: 4, maxStock: 8, lastUpdated: new Date().toISOString()},
        {id: 12, name: 'Grapefruit Syrup', category: 'syrup', unit: 'bottles', currentStock: 1, minStock: 2, maxStock: 4, lastUpdated: new Date().toISOString()},
        {id: 13, name: 'Pineapple Syrup', category: 'syrup', unit: 'bottles', currentStock: 2, minStock: 2, maxStock: 4, lastUpdated: new Date().toISOString()},
        {id: 14, name: 'Peach Syrup', category: 'syrup', unit: 'bottles', currentStock: 1.5, minStock: 4, maxStock: 8, lastUpdated: new Date().toISOString()},
        {id: 15, name: 'Passionfruit Syrup', category: 'syrup', unit: 'bottles', currentStock: 1, minStock: 4, maxStock: 8, lastUpdated: new Date().toISOString()},
        {id: 16, name: 'Yakult Syrup', category: 'syrup', unit: 'bottles', currentStock: 2, minStock: 4, maxStock: 8, lastUpdated: new Date().toISOString()},
        {id: 17, name: 'Orange Syrup', category: 'syrup', unit: 'bottles', currentStock: 1.5, minStock: 2, maxStock: 4, lastUpdated: new Date().toISOString()},
        {id: 18, name: 'Lychee Syrup', category: 'syrup', unit: 'bottles', currentStock: 1, minStock: 4, maxStock: 8, lastUpdated: new Date().toISOString()},
        {id: 19, name: 'White Peach Syrup', category: 'syrup', unit: 'bottles', currentStock: 0.5, minStock: 4, maxStock: 8, lastUpdated: new Date().toISOString()},
        
        // Coffee items
        {id: 20, name: 'Oat Milk', category: 'coffee', unit: 'cartons', currentStock: 8, minStock: 8, maxStock: 20, lastUpdated: new Date().toISOString()},
        {id: 21, name: 'Soy Milk', category: 'coffee', unit: 'cartons', currentStock: 6, minStock: 8, maxStock: 15, lastUpdated: new Date().toISOString()},
        {id: 22, name: 'Almond Milk', category: 'coffee', unit: 'cartons', currentStock: 4, minStock: 8, maxStock: 12, lastUpdated: new Date().toISOString()},
        {id: 23, name: 'Condensed Milk', category: 'coffee', unit: 'cans', currentStock: 6, minStock: 10, maxStock: 15, lastUpdated: new Date().toISOString()},
        {id: 24, name: 'Nutella', category: 'coffee', unit: 'jars', currentStock: 2, minStock: 8, maxStock: 10, lastUpdated: new Date().toISOString()},
        {id: 25, name: 'Sesame', category: 'coffee', unit: 'bottles', currentStock: 1, minStock: 1, maxStock: 3, lastUpdated: new Date().toISOString()},
        {id: 26, name: 'Matcha', category: 'coffee', unit: 'packs', currentStock: 0.3, minStock: 1, maxStock: 2, lastUpdated: new Date().toISOString()},
        {id: 27, name: 'Chocolate Syrup', category: 'coffee', unit: 'bottles', currentStock: 3, minStock: 1, maxStock: 2, lastUpdated: new Date().toISOString()},
        {id: 28, name: 'Caramel Syrup', category: 'coffee', unit: 'bottles', currentStock: 2, minStock: 1, maxStock: 2, lastUpdated: new Date().toISOString()},
        {id: 29, name: 'Chocolate Powder', category: 'coffee', unit: 'kg', currentStock: 1, minStock: 1, maxStock: 2, lastUpdated: new Date().toISOString()},
        {id: 30, name: 'Black Cherry Coffee Beans', category: 'coffee', unit: 'kg', currentStock: 2, minStock: 8, maxStock: 12, lastUpdated: new Date().toISOString()},
        
        // Tea items
        {id: 31, name: 'Oolong Tea', category: 'tea', unit: 'packs', currentStock: 3, minStock: 2, maxStock: 10, lastUpdated: new Date().toISOString()},
        {id: 32, name: 'Green Tea', category: 'tea', unit: 'packs', currentStock: 4, minStock: 6, maxStock: 12, lastUpdated: new Date().toISOString()},
        {id: 33, name: 'Black Tea', category: 'tea', unit: 'packs', currentStock: 5, minStock: 6, maxStock: 15, lastUpdated: new Date().toISOString()},
        {id: 34, name: 'Yuzi', category: 'tea', unit: 'bottles', currentStock: 1, minStock: 2, maxStock: 4, lastUpdated: new Date().toISOString()},
        {id: 35, name: 'Mint Tea', category: 'tea', unit: 'packs', currentStock: 2, minStock: 1, maxStock: 2, lastUpdated: new Date().toISOString()},
        {id: 36, name: 'Earl Grey Tea', category: 'tea', unit: 'packs', currentStock: 3, minStock: 1, maxStock: 2, lastUpdated: new Date().toISOString()},
        {id: 37, name: 'Chai Tea', category: 'tea', unit: 'packs', currentStock: 2, minStock: 1, maxStock: 2, lastUpdated: new Date().toISOString()},
        
        // Add-on items
        {id: 38, name: 'Mango Jelly', category: 'addon', unit: 'bottles', currentStock: 20, minStock: 1, maxStock: 2, lastUpdated: new Date().toISOString()},
        {id: 39, name: 'Lychee Jelly', category: 'addon', unit: 'bottles', currentStock: 15, minStock: 1, maxStock: 2, lastUpdated: new Date().toISOString()},
        {id: 40, name: 'Aloe', category: 'addon', unit: 'bottles', currentStock: 12, minStock: 1, maxStock: 2, lastUpdated: new Date().toISOString()},
        
        // Others
        {id: 41, name: 'Soda', category: 'others', unit: 'packs', currentStock: 25, minStock: 2, maxStock: 6, lastUpdated: new Date().toISOString()},
        {id: 42, name: 'Pineapple Juice', category: 'others', unit: 'cartons', currentStock: 2, minStock: 2, maxStock: 8, lastUpdated: new Date().toISOString()},
        {id: 43, name: 'Orange Juice', category: 'others', unit: 'cartons', currentStock: 6, minStock: 2, maxStock: 8, lastUpdated: new Date().toISOString()},
        {id: 44, name: 'Mango Pulp', category: 'others', unit: 'cans', currentStock: 4, minStock: 4, maxStock: 12, lastUpdated: new Date().toISOString()},
        {id: 45, name: 'Egg Pudding Powder', category: 'others', unit: 'packs', currentStock: 1, minStock: 4, maxStock: 8, lastUpdated: new Date().toISOString()},
        {id: 46, name: 'Napkins (Large)', category: 'others', unit: 'packs', currentStock: 15, minStock: 10, maxStock: 30, lastUpdated: new Date().toISOString()},
        {id: 47, name: 'Napkins (Small)', category: 'others', unit: 'packs', currentStock: 20, minStock: 10, maxStock: 40, lastUpdated: new Date().toISOString()}
    ];
    
    stockItems = actualInventory;
    saveData();
    renderStockList();
    updateReports();
}

// Render stock list
function renderStockList() {
    const stockList = document.getElementById('stockList');
    const emptyState = document.getElementById('emptyInventory');
    
    let filteredItems = stockItems;
    
    // Apply category filter
    if (currentFilter !== 'all') {
        filteredItems = stockItems.filter(item => item.category === currentFilter);
    }
    
    // Apply search filter
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (searchTerm) {
        filteredItems = filteredItems.filter(item => 
            item.name.toLowerCase().includes(searchTerm)
        );
    }
    
    if (filteredItems.length === 0) {
        stockList.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }
    
    emptyState.classList.add('hidden');
    
    stockList.innerHTML = filteredItems.map(item => {
        const status = getStockStatus(item);
        const statusClass = status === 'Low' ? 'status-low' : 
                          status === 'High' ? 'status-high' : 'status-ok';
        
        return `
            <div class="stock-item" data-category="${item.category}">
                <div class="stock-item-header">
                    <div class="stock-item-name">${item.name}</div>
                    <div class="stock-status ${statusClass}">${status}</div>
                </div>
                <div style="font-size: 14px; color: #666; margin-bottom: 10px;">
                    Category: ${item.category} | Unit: ${item.unit}
                </div>
                <div class="stock-controls">
                    <input type="number" class="quantity-input" 
                           value="${item.currentStock}" 
                           onchange="updateStock(${item.id}, this.value)"
                           min="0">
                    <button class="btn btn-secondary btn-small" onclick="editItem(${item.id})">Edit</button>
                    <button class="btn btn-danger btn-small" onclick="deleteItem(${item.id})">Delete</button>
                </div>
            </div>
        `;
    }).join('');
}

// Get stock status
function getStockStatus(item) {
    if (item.currentStock <= item.minStock) return 'Low';
    if (item.currentStock >= item.maxStock) return 'High';
    return 'OK';
}

// Update stock
function updateStock(itemId, newStock) {
    const item = stockItems.find(i => i.id === itemId);
    if (item) {
        item.currentStock = parseInt(newStock) || 0;
        item.lastUpdated = new Date().toISOString();
        saveData();
        renderStockList();
        updateReports();
    }
}

// Delete item
function deleteItem(itemId) {
    if (confirm('Are you sure you want to delete this item?')) {
        stockItems = stockItems.filter(i => i.id !== itemId);
        saveData();
        renderStockList();
        updateReports();
    }
}

// Edit item
function editItem(itemId) {
    const item = stockItems.find(i => i.id === itemId);
    if (!item) return;
    
    const newName = prompt('Item name:', item.name);
    if (newName === null) return;
    
    const newUnit = prompt('Unit:', item.unit);
    if (newUnit === null) return;
    
    const newMinStock = prompt('Minimum stock:', item.minStock);
    if (newMinStock === null) return;
    
    const newMaxStock = prompt('Maximum stock:', item.maxStock);
    if (newMaxStock === null) return;
    
    item.name = newName.trim() || item.name;
    item.unit = newUnit.trim() || item.unit;
    item.minStock = parseInt(newMinStock) || item.minStock;
    item.maxStock = parseInt(newMaxStock) || item.maxStock;
    
    saveData();
    renderStockList();
    updateReports();
}

// Filter functions
function filterByCategory(category) {
    currentFilter = category;
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderStockList();
}

function filterItems() {
    renderStockList();
}

// Update reports
function updateReports() {
    const totalItems = stockItems.length;
    const lowStockItems = stockItems.filter(item => getStockStatus(item) === 'Low').length;
    const okStockItems = stockItems.filter(item => getStockStatus(item) === 'OK').length;
    
    document.getElementById('totalItems').textContent = totalItems;
    document.getElementById('lowStockItems').textContent = lowStockItems;
    document.getElementById('okStockItems').textContent = okStockItems;
    
    // Generate shopping list
    const shoppingItems = stockItems.filter(item => getStockStatus(item) === 'Low');
    const shoppingList = document.getElementById('shoppingList');
    
    if (shoppingItems.length === 0) {
        shoppingList.innerHTML = '<p style="color: #666; font-style: italic;">All items are well stocked! 🎉</p>';
    } else {
        shoppingList.innerHTML = shoppingItems.map(item => `
            <div style="padding: 10px; border: 1px solid #ddd; border-radius: 5px; margin-bottom: 10px;">
                <strong>${item.name}</strong> - Current: ${item.currentStock} ${item.unit}, Need: ${item.minStock - item.currentStock} ${item.unit}
            </div>
        `).join('');
    }
}

// Generate report
function generateReport() {
    const now = new Date();
    const report = `
WEEKLY STOCK REPORT
Generated: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}

SUMMARY:
- Total Items: ${stockItems.length}
- Low Stock Items: ${stockItems.filter(item => getStockStatus(item) === 'Low').length}
- Items in Stock: ${stockItems.filter(item => getStockStatus(item) === 'OK').length}
- Overstocked Items: ${stockItems.filter(item => getStockStatus(item) === 'High').length}

SHOPPING LIST:
${stockItems.filter(item => getStockStatus(item) === 'Low')
  .map(item => `- ${item.name}: Need ${Math.max(item.minStock - item.currentStock, 0)} ${item.unit}`)
  .join('\n') || 'No items needed'}

FULL INVENTORY:
${stockItems.map(item => `- ${item.name}: ${item.currentStock} ${item.unit} (${getStockStatus(item)})`).join('\n')}
    `.trim();
    
    // Create and download report
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stock-report-${now.toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

// Data management
function saveData() {
    try {
        localStorage.setItem('restaurantStock', JSON.stringify(stockItems));
    } catch (e) {
        alert('Unable to save data. Storage might be full.');
    }
}

function loadData() {
    try {
        const saved = localStorage.getItem('restaurantStock');
        if (saved) {
            stockItems = JSON.parse(saved);
        }
    } catch (e) {
        console.error('Error loading data:', e);
        stockItems = [];
    }
}

// Export/Import functions
function exportMasterInventory() {
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay() + 1)); // Monday
    const weekLabel = weekStart.toISOString().split('T')[0];
    
    const csv = [
        'Name,Category,Unit,Current Stock,Min Stock,Max Stock,Last Updated',
        ...stockItems.map(item => 
            `"${item.name}","${item.category}","${item.unit}",${item.currentStock},${item.minStock},${item.maxStock},"${item.lastUpdated}"`
        )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MASTER-INVENTORY-Week-${weekLabel}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    alert(`Master inventory exported for week of ${weekStart.toLocaleDateString()}!\nShare this file with all staff members.`);
}

function importMasterData() {
    const file = document.getElementById('importFile').files[0];
    if (!file) return;
    
    if (!file.name.includes('MASTER-INVENTORY')) {
        if (!confirm('This doesn\'t appear to be a master inventory file. Continue anyway?')) {
            return;
        }
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const csv = e.target.result;
            const lines = csv.split('\n');
            
            const importedItems = [];
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) continue;
                
                // Parse CSV with proper quote handling
                const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
                if (values.length >= 6) {
                    importedItems.push({
                        id: Date.now() + i,
                        name: values[0].replace(/"/g, ''),
                        category: values[1].replace(/"/g, ''),
                        unit: values[2].replace(/"/g, ''),
                        currentStock: parseFloat(values[3]) || 0,
                        minStock: parseInt(values[4]) || 0,
                        maxStock: parseInt(values[5]) || 100,
                        lastUpdated: values[6] ? values[6].replace(/"/g, '') : new Date().toISOString()
                    });
                }
            }
            
            if (confirm(`Import ${importedItems.length} items from master inventory?\nThis will replace your current data.`)) {
                stockItems = importedItems;
                saveData();
                renderStockList();
                updateReports();
                alert(`✅ Master inventory imported successfully!\n${importedItems.length} items updated.`);
            }
        } catch (e) {
            alert('❌ Error importing file. Please check the file format.');
        }
        
        // Reset file input
        document.getElementById('importFile').value = '';
    };
    reader.readAsText(file);
}

function exportCurrentData() {
    const now = new Date();
    const csv = [
        'Name,Category,Unit,Current Stock,Min Stock,Max Stock,Last Updated',
        ...stockItems.map(item => 
            `"${item.name}","${item.category}","${item.unit}",${item.currentStock},${item.minStock},${item.maxStock},"${item.lastUpdated}"`
        )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `my-inventory-backup-${now.toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

function importBackupData() {
    // Create a separate file input for backup imports
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    fileInput.onchange = function() {
        const file = fileInput.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const csv = e.target.result;
                const lines = csv.split('\n');
                
                const importedItems = [];
                for (let i = 1; i < lines.length; i++) {
                    const line = lines[i].trim();
                    if (!line) continue;
                    
                    const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
                    if (values.length >= 6) {
                        importedItems.push({
                            id: Date.now() + i,
                            name: values[0].replace(/"/g, ''),
                            category: values[1].replace(/"/g, ''),
                            unit: values[2].replace(/"/g, ''),
                            currentStock: parseFloat(values[3]) || 0,
                            minStock: parseInt(values[4]) || 0,
                            maxStock: parseInt(values[5]) || 100,
                            lastUpdated: values[6] ? values[6].replace(/"/g, '') : new Date().toISOString()
                        });
                    }
                }
                
                if (confirm(`Import ${importedItems.length} items from backup?\nThis will replace your current data.`)) {
                    stockItems = importedItems;
                    saveData();
                    renderStockList();
                    updateReports();
                    alert('Backup imported successfully!');
                }
            } catch (e) {
                alert('Error importing backup file.');
            }
        };
        reader.readAsText(file);
    };
    fileInput.click();
}

function clearAllData() {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
        if (confirm('This will delete ALL your inventory data. Are you absolutely sure?')) {
            stockItems = [];
            saveData();
            renderStockList();
            updateReports();
            alert('All data has been cleared.');
        }
    }
}
