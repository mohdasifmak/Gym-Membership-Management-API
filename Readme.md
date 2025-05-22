# 🏋️ Gym Membership Management API

A RESTful backend API built with Node.js, Express.js, and MongoDB to manage users, subscriptions, attendance, payments, and admin dashboard functionality for a gym business.

---

## 📦 Tech Stack

- Node.js + Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt Password Hashing
- PDFKit for Invoices
- Middleware: CORS, Helmet, Morgan, Rate Limiting

---

## 🔐 Features Overview

### ✅ User Management

- Register/Login with JWT
- Secure password hashing (bcrypt)
- Role-based access control (admin/member)
- Profile update & deletion

### 📋 Membership Plans

- Admin-only CRUD for plans
- Plan duration, price, access control

### 📅 Subscriptions

- Subscribe to a plan
- Cancel or freeze subscriptions
- View subscription history

### 📍 Attendance

- Manual and QR-based check-ins
- View today's attendance
- User attendance history & summary

### 💳 Payments & Invoices

- Record and track payments
- Generate PDF invoices
- Admin payment view

### 📊 Admin Dashboard

- Total users
- Active subscriptions
- Today's check-ins
- Total revenue
- Most popular plan

---

## 📁 Project Structure

📦gym-api/
┣ 📂config/
┃ ┗ db.js
┣ 📂controllers/
┣ 📂middlewares/
┣ 📂models/
┣ 📂routes/
┣ server.js
┣ .env
┣ README.md
┗ package.json

---

## ⚙️ Setup & Run

### 1. Clone the repository

cd gym-api

### 2. Install dependencies

npm install

### 3. Create .env file

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret

### 4. Run the server

node server.js
