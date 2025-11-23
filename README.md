# 🚀 Space Ships & Patrols API

A robust RESTful API built with Node.js, Express, and MongoDB for managing space ships and patrols. Features secure authentication, role-based access control, and comprehensive API documentation.

## ✨ Features

- **🔐 Authentication & Authorization**: JWT-based auth with role-based access control (User/Admin).
- **🛡️ Security**: Implemented with `helmet`, `cors`, and input validation using `express-validator`.
- **📝 API Documentation**: Interactive Swagger UI available at `/api-docs`.
- **⚡ Performance**: Pagination and filtering for large datasets.
- **🧪 Testing**: Automated integration tests with Jest and Supertest.
- **🏗️ Architecture**: Clean MVC structure with Service layer.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Testing**: Jest, Supertest
- **Docs**: Swagger (OpenAPI 3.0)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd naves-nodes
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>
   JWT_SECRET=your_super_secret_key
   ```

### Running the App

- **Development**:

  ```bash
  npm start
  ```

  Server runs at `http://localhost:3000`

- **Tests**:
  ```bash
  npm test
  ```

## 📚 API Documentation

Full API documentation is available via Swagger UI:
👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

### Key Endpoints

| Method | Endpoint         | Description                 | Auth       |
| ------ | ---------------- | --------------------------- | ---------- |
| POST   | `/auth/register` | Register a new user         | ❌         |
| POST   | `/auth/login`    | Login and get token         | ❌         |
| GET    | `/naves`         | Get all ships (paginated)   | ❌         |
| POST   | `/naves`         | Create a ship               | ❌         |
| GET    | `/patrol`        | Get all patrols (paginated) | ❌         |
| POST   | `/patrol`        | Create a patrol             | ❌         |
| PUT    | `/patrol/:id`    | Update a patrol             | ✅ (Admin) |
