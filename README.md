# Employee Management Dashboard

## Overview

This Employee Management Dashboard is a full-stack web application designed for managing employee records. It includes features like viewing employee lists, adding, and editing employee details, and a secure login system. The project is built using React.js for the frontend and Node.js for the backend, integrated with JWT authentication, and features a protected routing system.

**Tech Stack:**

- **Frontend:** React.js, Tailwind CSS, React Router, Axios, React Toastify
- **Backend:** Node.js, Express.js, MongoDB, JWT for authentication
- **Other Libraries/Tools:** Mongoose, bcrypt, react-toastify

> **Note:** A video demonstrating the functionality of the dashboard can be found [here](https://www.loom.com/share/83c0a2a686fc4b6d9b156ca4149d4096?sid=673f397f-28c5-4e39-9c6b-cf5aff8b4967).

---

## Features

- **Authentication System:** Secure login with JWT-based authentication. Users must be logged in to access the dashboard and employee management pages.
- **Employee Management:**
  - View a list of employees.
  - Add new employees.
  - Edit employee details.
- **Protected Routes:** Unauthorized users are redirected to the login page if they attempt to access protected routes.
- **Custom Toast Notifications:** Success, warning, and error messages are displayed using `react-toastify` for better UX.
- **Responsive Navbar:** Displays different menus based on whether the user is logged in or not.
- **Responsive Design:** Optimized for both desktop and mobile views.
- **API Integration:** Data is fetched and submitted to the backend via REST APIs.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- MongoDB

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/employee-management-dashboard.git
    cd employee-management-dashboard

    ```

2.  **Install the backend dependencies:**

    ```bash
    cd api
    npm install

    ```

3.  **Install the frontend dependencies:**

    ```bash
    cd ../app
    npm install

    ```

4.  **Set up backend environment variables:**

    ```bash
    PORT=your_port
    NODE_ENV=your_environment
    MONGO_URI=your_mongo_db_connection_string
    JWT_SECRET=your_jwt_secret

    ```

5.  **Set up frontend environment variables:**

    ```bash
    REACT_APP_API_BASE_URL=your_api_base_url

    ```

6.  **Run the backend server:**

    ```bash
    cd api
    npm run dev

    ```

7.  **Run the backend server:**

    ```bash
    cd app
    npm start

    ```

## License

This project is licensed under the MIT License. You can find the full text of the license [here](./LICENSE).
