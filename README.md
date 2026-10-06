# 🚀 CODIMIUM CRM — Lead Management System

A modern and responsive **Lead Management System (CRM)** built with the **MERN Stack** for managing potential clients, leads, follow-ups, sales pipelines, and team members.

---

## ✨ Project Overview

**CODIMIUM CRM** is a full-stack CRM application designed to help businesses manage their leads and client communication efficiently.

The system allows authenticated users to:

* 🔐 Register and Login
* 👥 Manage Leads
* ➕ Add New Leads
* ✏️ Edit Lead Information
* 📋 View Lead Details
* 📊 Manage Sales Pipeline
* 🔔 Track Follow-ups
* 👤 Manage Team Members
* 📥 Import / Export Lead Data
* 🚪 Securely Logout

---

## 🛠️ Tech Stack

### Frontend

* ⚛️ React.js
* 🎨 Tailwind CSS
* 🧭 React Router DOM
* 📡 Axios
* 🎯 Lucide React Icons

### Backend

* 🟢 Node.js
* 🚂 Express.js
* 🍃 MongoDB
* 🧩 Mongoose
* 🔐 JWT Authentication
* 🔒 bcrypt

---

# 🔐 Authentication

The application uses authentication to protect the CRM dashboard.

### Authentication Flow

```text
Register
   ↓
Login
   ↓
JWT Token
   ↓
Dashboard
   ↓
Protected CRM Pages
```

### Authentication Features

* User Registration
* Login
* Password Hashing with bcrypt
* JWT Token Authentication
* Protected Routes
* Logout
* Token stored in Local Storage

<!-- Add Authentication Screenshot here later -->

<!-- ![Authentication](./screenshots/authentication.png) -->

---

# 📊 CRM Features

## 🏠 Dashboard

The dashboard provides an overview of the CRM system and gives users quick access to different modules.

<!-- Add Dashboard Screenshot here later -->

<!-- ![Dashboard](./screenshots/dashboard.png) -->

---

## 👥 Leads

The Leads section allows users to view and manage potential clients.

### Lead Information

* Business Name
* Contact Person
* Phone / WhatsApp
* Email
* City
* Business Category
* Website URL
* Social Media URL
* Potential Service
* Lead Status
* Notes
* Assigned Team Member

<!-- Add Leads Screenshot here later -->

<!-- ![Leads](./screenshots/leads.png) -->

---

## ➕ Add Lead

Users can create new leads by entering the required business and contact information.

<!-- Add Add Lead Screenshot here later -->

<!-- ![Add Lead](./screenshots/add-lead.png) -->

---

## 📋 Lead Details

Users can open an individual lead and view its complete information.

<!-- Add Lead Details Screenshot here later -->

<!-- ![Lead Details](./screenshots/lead-details.png) -->

---

## 📊 Pipeline

The Pipeline section helps users track leads according to their current sales stage.

<!-- Add Pipeline Screenshot here later -->

<!-- ![Pipeline](./screenshots/pipeline.png) -->

---

## 🔔 Follow-ups

The Follow-ups section helps users keep track of communication and follow-up activities with potential clients.

<!-- Add Follow-ups Screenshot here later -->

<!-- ![Follow-ups](./screenshots/follow-ups.png) -->

---

## 👤 Users

Admin users can manage CRM team members and their access to leads.

<!-- Add Users Screenshot here later -->

<!-- ![Users](./screenshots/users.png) -->

---

## 📥 Import / Export

The Import / Export section is designed for handling lead data efficiently.

<!-- Add Import / Export Screenshot here later -->

<!-- ![Import Export](./screenshots/import-export.png) -->

---

# 🧭 Application Navigation

The CRM sidebar provides navigation to the main modules:

```text
Dashboard
│
├── Leads
│   └── Add Lead
│
├── Pipeline
├── Follow-ups
├── Users
└── Import / Export
```

---

# 📁 Project Structure

```text
CODIMIUM-CRM/
│
├── client/
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Sidebar.jsx
│       │   ├── LeadCard.jsx
│       │   └── DashboardCard.jsx
│       │
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Leads/
│       │   │   ├── Leads.jsx
│       │   │   ├── AddLead.jsx
│       │   │   ├── EditLead.jsx
│       │   │   └── LeadDetails.jsx
│       │   ├── Pipeline.jsx
│       │   ├── FollowUps.jsx
│       │   ├── Users.jsx
│       │   └── ImportExport.jsx
│       │
│       └── App.jsx
│
└── server/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── config/
    └── server.js
```

---

# 🧭 Sidebar Routes

The current sidebar navigation includes:

| Page               | Route            |
| ------------------ | ---------------- |
| 🏠 Dashboard       | `/`              |
| 👥 Leads           | `/leads`         |
| ➕ Add Lead         | `/leads/add`     |
| 📊 Pipeline        | `/pipeline`      |
| 🔔 Follow-ups      | `/follow-ups`    |
| 👤 Users           | `/users`         |
| 📥 Import / Export | `/import-export` |

---

# 🔌 API Architecture

The backend follows a REST API architecture.

```text
React Frontend
      ↓
    Axios
      ↓
Express.js API
      ↓
Controllers
      ↓
Mongoose
      ↓
MongoDB
```

---

# 🔒 Security

The application includes:

* 🔐 JWT-based authentication
* 🔒 Password hashing using bcrypt
* 🛡️ Protected routes
* 👤 Role-based access
* 🚫 Unauthorized dashboard access prevention
* 🔑 Environment variables for sensitive configuration

---

# 🚀 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

## 2️⃣ Install Frontend Dependencies

```bash
cd client
npm install
```

## 3️⃣ Install Backend Dependencies

```bash
cd ../server
npm install
```

## 4️⃣ Start Backend

```bash
npm run dev
```

## 5️⃣ Start Frontend

```bash
cd ../client
npm run dev
```

---

# ⚙️ Environment Variables

### Backend `.env`

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:5000
```

> ⚠️ Never upload your `.env` file or expose database credentials and JWT secrets publicly.

---

# 👥 User Roles

### 👑 Admin

Admin users can:

* Manage all leads
* Manage users
* Assign leads
* Monitor CRM activity

### 👤 Team Member

Team members can:

* View assigned leads
* Manage their assigned leads
* Update lead information
* Handle follow-ups

---

# 📸 Screenshots

Screenshots will be added as the project UI is completed.

### Planned Screenshots

<!-- ![Login](./screenshots/login.png) -->

<!-- ![Register](./screenshots/register.png) -->

<!-- ![Dashboard](./screenshots/dashboard.png) -->

<!-- ![Leads](./screenshots/leads.png) -->

<!-- ![Add Lead](./screenshots/add-lead.png) -->

<!-- ![Lead Details](./screenshots/lead-details.png) -->

<!-- ![Pipeline](./screenshots/pipeline.png) -->

<!-- ![Follow-ups](./screenshots/follow-ups.png) -->

<!-- ![Users](./screenshots/users.png) -->

<!-- ![Import Export](./screenshots/import-export.png) -->

---

# 🎯 Project Goal

The goal of **CODIMIUM CRM** is to provide a simple, clean, and efficient platform for managing potential clients and improving the sales follow-up process.

---

# 👨‍💻 Developer

**CODIMIUM CRM**

Built with ❤️ using the **MERN Stack**.

---

