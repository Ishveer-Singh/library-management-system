# 📚 BookSphere — Backend

BookSphere Backend is a RESTful API for a library management system built with Node.js, Express, and MySQL.

It provides authentication, authorization, book management, member management, and issued-book operations for the BookSphere frontend.

## 🌐 Deployment

**Live Application:**
[BookSphere Frontend](https://library-management-frontend-teh2.onrender.com)


> The backend is hosted on Render's free instance, so the service may take longer to respond after a period of inactivity.

---

## 🔑 Demo Account

A demo user account is available for quickly testing the application:

```text
Email: user@gmail.com
Password: user_user
Role: User
```

Users can also create their own account through the registration page.

### 👤 User Permissions

Normal users can:

* View books
* Search books
* View members
* Search members
* View issued books
* Access the dashboard

Normal users cannot perform administrative operations.

### 👑 Admin Permissions

Admins can perform management operations such as:

* Add books
* Edit books
* Delete books
* Add/edit/delete members
* Issue books
* Return books

Admin-only operations are protected by backend authorization.

---

## ✨ Features

* 🔐 User registration and login
* 🔑 JWT authentication
* 🔒 Password hashing with bcrypt
* 🛡️ Role-based authorization
* 📚 Book CRUD operations
* 🔎 Book search
* 📄 Pagination
* 👥 Member management
* 📖 Issue book functionality
* ↩️ Return book functionality
* 🗄️ MySQL database
* 🔄 Database transactions
* 🛡️ Security middleware
* 🚦 Rate limiting
* 🌐 CORS configuration
* 🏗️ MVC architecture
* ⚠️ Centralized error handling

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **MySQL**
* **mysql2**
* **JWT**
* **bcrypt**
* **Helmet**
* **CORS**
* **express-rate-limit**

---

## 🏗️ Architecture

The backend follows an MVC-style architecture:

```text
Request
   ↓
Routes
   ↓
Middleware
   ↓
Controllers
   ↓
Models
   ↓
MySQL Database
```

---

## 📁 Project Structure

```text
├── controllers/
├── models/
├── routes/
├── middleware/
├── db.js
├── server.js
├── package.json
└── .env
```

---

## 🗄️ Database

BookSphere uses MySQL.

### Main Tables

**`books`**
Stores information about books available in the library.

**`members`**
Stores library member information.

**`issued_books`**
Stores book issue and return information.

**`user`**
Stores application users and their roles.

---

## 🔄 Book Issue & Return

When a book is issued, the backend uses a database transaction to maintain consistency between the issued-book record and the book's available copies.

Returning a book updates the issue status and restores the available copy.

These operations are restricted according to the user's role.

---

## 🔐 Authentication & Authorization

BookSphere uses JWT for authentication and bcrypt for password hashing.

Role-based authorization is implemented at the backend level.

For example, an authenticated normal user cannot bypass the frontend and directly call an admin-only endpoint to delete a book or return an issued book.

---

## 🛡️ Security

The backend includes:

* Password hashing with bcrypt
* JWT authentication
* Role-based authorization
* Helmet security headers
* CORS configuration
* Rate limiting
* Environment variables for sensitive credentials
* Centralized error handling

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000

DB_HOST=your_database_host
DB_PORT=3306
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name

JWT_SECRET=your_jwt_secret
```

**Never commit `.env` or database credentials to GitHub.**

Add the following to `.gitignore`:

```text
.env
node_modules/
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Ishveer-Singh/library-management-system.git
cd library-management-system
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file with your MySQL credentials and JWT secret.

### 4. Start the server

For development:

```bash
npm run dev
```

Or:

```bash
npm start
```

The API will normally run on:

```text
http://localhost:5000
```

---

## 🔗 API

The deployed backend is available at:

```text
https://booksphere-backend-zd4g.onrender.com/
```

The frontend communicates with the API through the `/api/v1` routes.

---

## 🚀 Deployment

The backend is deployed on Render and uses a cloud-hosted MySQL database.

Production credentials and secrets are provided through environment variables.

---

## 🔗 Repositories

**Frontend:**
[GitHub Repository](https://github.com/Ishveer-Singh/library-management-frontend)

**Backend:**
[GitHub Repository](https://github.com/Ishveer-Singh/library-management-system)

---

## 👨‍💻 Author

**Ishveer Singh**

[GitHub Profile](https://github.com/Ishveer-Singh)

Built as a full-stack project to practice Node.js, Express, REST APIs, authentication, authorization, MySQL, MVC architecture, security, and cloud deployment.
