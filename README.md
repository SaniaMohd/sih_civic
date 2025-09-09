# # sih_civic

A prototype for a civic issue reporting platform with separate Citizen and Admin interfaces.

## Project Structure

```
civic-issue-prototype/
│
├── backend/
│   ├── uploads/                  # Stores uploaded images
│   ├── models/
│   │   └── Report.js             # Mongoose schema for issue reports
│   ├── routes/
│   │   └── reportRoutes.js       # API endpoints for reports
│   ├── server.js                 # Main backend server file (Express.js)
│   └── package.json              # Backend dependencies and scripts
│
├── frontend/
│   ├── citizen/
│   │   └── index.html            # Citizen issue reporting UI
│   │
│   └── admin/
│       └── admin.html            # Admin dashboard UI
│
├── .gitignore                    # Ignore node_modules, uploads
├── README.md                     # Project description and setup instructions
└── package.json                  # Project-level dependencies (if backend & frontend together)
```

## Features

- Citizens can report local civic issues with images.
- Admins can view, manage, and resolve reported issues.
- Image upload support.
- Organized backend (Express + MongoDB) and frontend (HTML/CSS/JS).

## Getting Started

### Backend

1. Install dependencies:
    ```bash
    cd backend
    npm install
    ```
2. Start the backend server:
    ```bash
    node server.js
    ```
3. Make sure MongoDB is running.

### Frontend

- Open `frontend/citizen/index.html` for the citizen UI.
- Open `frontend/admin/admin.html` for the admin dashboard.

---

Feel free to update this README as your project evolves!
