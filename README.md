# 🗳️ Vanilla JS Voting Widget

A modular frontend application built with HTML, CSS, and Vanilla JavaScript.  
This project includes a dynamic voting system, modal editing, local state management (via localStorage), and clean UI rendering — all with no frameworks.

## 🚀 Run the Project Locally

Make sure you have Node.js installed. Then run:

npx serve

This will start a local development server. By default:

http://localhost:3000

## 🧷 Clone the Repository

Clone the project from GitHub:

git clone https://github.com/KostyaKovbelDigis/vanila-voting-widget.git  
cd vanila-voting-widget

## 🔧 Technologies Used

- HTML5
- CSS3 (modular)
- Vanilla JavaScript (ES6+)
- localStorage as a pseudo-API
- serve for local dev

## 🔄 Pull Latest Changes

To sync your local project with the latest changes from the remote repository:

git pull origin main

## 🧠 Notes

- On load, the app checks localStorage for data (componentDidMount-style).
- If data exists, it’s used immediately. If not, data is fetched once from the remote API.
- Since the API does not support update/delete, all interaction is stored locally.
- The UI is fully editable via a modal, and all data is persisted locally.
- localStorage is treated as the backend, mimicking real API behavior.

## 📄 License

MIT License.  
Created by Kostya
