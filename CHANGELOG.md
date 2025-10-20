# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - Initial Release

### Added

- **Initial Release** of the Restaurant Stock Manager application.
- **Inventory Management**:
    - View a list of all stock items.
    - Add new stock items with details like name, category, unit, min/max stock levels.
    - Edit existing item details.
    - Delete items from inventory.
    - Update current stock quantity for each item.
- **Tabbed Interface**:
    - `Inventory` tab for viewing and managing stock levels.
    - `Manage` tab for adding new items and data management.
    - `Reports` tab for viewing stock statistics and generating reports.
- **Filtering and Searching**:
    - Search for items by name.
    - Filter items by category.
- **Stock Status**:
    - Visual indicators for 'Low', 'OK', and 'High' stock levels.
- **Shopping List**:
    - Ability to add/remove items to a "Buying List".
    - View the shopping list in the Reports tab.
    - Copy the buying list to the clipboard.
- **Reporting**:
    - Generate a comprehensive weekly stock report as a `.txt` file.
    - View key statistics like total items, low stock items, and in-stock items.
- **Data Persistence & Management**:
    - All inventory data is saved locally in the browser's `localStorage`.
    - Export/Import master inventory as a `.csv` file for sharing and syncing.
    - "Clear All Data" option to reset the application.
- **Sample Data**:
    - Automatically populates with sample data on first run if the inventory is empty.