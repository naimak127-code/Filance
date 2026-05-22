Finlance - Frontend (React.js + LocalStorage)
This is the client-side application for Finlance, a personal finance dashboard. It features a robust, persistent user experience by utilizing Browser LocalStorage for data management and state persistence.

🚀 Key Frontend Features
Persistent Dashboard: Uses localStorage to ensure your transactions, budgets, and settings remain saved even after a page refresh or browser restart.

Dynamic Budgeting: Real-time progress bars for categories like Food, Gifts, and Education.

Transaction Management: Full CRUD (Create, Read, Update, Delete) functionality for logging income and expenses.

Account Filtering: Quickly view balances across different platforms like HBL or Jazz Cash.

Muted Professional UI: A clean, high-contrast layout designed for clarity and ease of use.

Tech Stack
Framework: React.js

Styling: Tailwind CSS

Data Persistence: Browser LocalStorage API

Icons: Lucide React

Charts: Chart.js / Recharts (Visualizing Income vs. Expenses)

How LocalStorage is Used
This project implements a custom hook/logic to handle data sync:

Initial Load: The app checks for existing keys (e.g., finlance_transactions) in the browser.

State Updates: Every time a transaction is added or a budget is edited, the state is synced back to LocalStorage.

Data Integrity: Ensures users can demo the app locally without needing a complex backend setup.

Development Setup
Install Dependencies:

Bash
npm install
Run the Project:

Bash
npm start



