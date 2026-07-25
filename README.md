# Library Management System

A backend API for managing a library system. This project provides APIs for managing books, members, and book issuing/return operations with secure authentication, authorization, relational database handling, and transaction management.

The project follows real-world backend development practices including MVC architecture, JWT authentication, role-based authorization, validation, error handling, pagination, search, API versioning, and security middleware.

---

# Features

## Authentication

- User registration
- User login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes

## Authorization

- Role-based access control
- Admin and user roles
- Admin-only operations

## Book Management

- Add books
- Get all books
- Get book by ID
- Update books
- Delete books
- Pagination
- Search books

## Member Management

- Add members
- Get members
- Update members
- Delete members

## Issue & Return System

- Issue books to members
- Return books
- Track issued books
- Automatically update available book copies
- MySQL transactions for maintaining data consistency

## Error & Security Features

- Request validation
- Centralized error handling
- SQL injection prevention using prepared statements
- Helmet security headers
- CORS configuration
- Rate limiting
- Environment variable protection

---

# Tech Stack

## Backend

- Node.js
- Express.js
- MySQL
- mysql2
- JWT
- bcrypt
- dotenv
- Helmet
- CORS
- Express Rate Limiter

# Project Structure

```
library-management-system

├── controllers
├── models
├── routes
├── middleware
├── db
├── app.js
├── server.js
└── package.json
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/Ishveer-Singh/library-management-system.git
```

## Move into Project Folder

```bash
cd library-management-system
```

## Install Dependencies

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory.

Example:

```env
PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=library_management
JWT_SECRET=your_secret_key
```

## Run Application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

---

# API Documentation

Base URL:

```
/api/v1
```

---

# Authentication Routes

## Register

```
POST /api/v1/register
```

Access:
```
Public
```

---

## Login

```
POST /api/v1/login
```

Access:
```
Public
```

---

# Book Routes

## Get All Books

```
GET /api/v1/books
```

Access:
```
Authenticated Users
```

Example:

```
GET /api/v1/books?page=1&limit=10
```

---

## Search Books

```
GET /api/v1/books?title=harry
```

---

## Sort Books

```
GET /api/v1/books?sort=title
```

---

## Get Book By ID

```
GET /api/v1/books/:id
```

Access:
```
Authenticated Users
```

---

## Add Book

```
POST /api/v1/books
```

Access:
```
Admin Only
```

---

## Update Book

```
PUT /api/v1/books/:id
```

Access:
```
Admin Only
```

---

## Delete Book

```
DELETE /api/v1/books/:id
```

Access:
```
Admin Only
```

---

# Member Routes

## Get Members

```
GET /api/v1/members
```

Access:
```
Authenticated Users
```

---

## Add Member

```
POST /api/v1/members
```

Access:
```
Admin Only
```

---

## Update Member

```
PUT /api/v1/members/:id
```

Access:
```
Admin Only
```

---

## Delete Member

```
DELETE /api/v1/members/:id
```

Access:
```
Admin Only
```

---

# Issued Books Routes

## Issue Book

```
POST /api/v1/issued-books
```

Access:
```
Admin Only
```

---

## Return Book

```
PUT /api/v1/issued-books/:id
```

Access:
```
Admin Only
```

---

# Database Schema

## Users

```
id
name
email
password
role
```

---

## Books

```
id
title
author
category
available_copies
```

---

## Members

```
id
name
email
phone
```

---

## Issued Books

```
id
book_id
member_id
issue_date
return_date
```

---

# API Testing

All APIs were tested using Thunder Client.

---

# Future Improvements

- React frontend
- User dashboard
- Admin dashboard
- Book cover image upload
- Deployment
- Automated testing

---

# Live Demo

Coming Soon

---

# License

This project is licensed under the MIT License.

---

# Author

Ishveer Singh