# 📘 Simple Book API

A simple Node.js and Express REST API for managing books and users with authentication.  
Now deployed on **Render** and connected to **MongoDB Atlas** for cloud-based data storage.

---

## 🌐 Live Deployment

🔗 **URL:** [[https://appdev2-raiu.onrender.com](https://appdev2-raiu.onrender.com)](https://appdev2-raiu.onrender.com/)

You can just simply use API tools like **Postman**, **Thunder Client**, etc. to test the endpoints.

---

## 🔐 Authentication Endpoints

### 📝 Sign Up  
**POST** `/api/auth/signup`  
**Body:**
```json
{
  "username": "yourUsername",
  "email": "your@email.com",
  "password": "yourPassword"
}
```

### 🔑 Sign In  
**POST** `/api/auth/signin`  
**Body:**
```json
{
  "username": "yourUsername",
  "password": "yourPassword"
}
```

🔑 Response will include a JWT token. Use this token in the `Authorization` header like:
```
Authorization: Bearer YOUR_TOKEN
```

---

## 📚 Book Endpoints (Protected)

All routes below require a valid JWT token.

### 📖 Get All Books  
**GET** `/api/books`  
**Header:**
```
Authorization: Bearer YOUR_TOKEN
```

### ➕ Create a New Book  
**POST** `/api/books`  
**Header:**
```
Authorization: Bearer YOUR_TOKEN
```

**Body:**
```json
{
  "title": "Sample Book",
  "author": "Author Name",
  "year": 2023
}
```

### ✏️ Update a Book  
**PUT** `/api/books/:id`  
**Header:**
```
Authorization: Bearer YOUR_TOKEN
```

**Body:**
```json
{
  "title": "Updated Book Title",
  "author": "Updated Author",
  "year": 2024
}
```

### ❌ Delete a Book  
**DELETE** `/api/books/:id`  
**Header:**
```
Authorization: Bearer YOUR_TOKEN
```

---

## 🌱 Seeding the Database (Optional)

To insert fake users and books for testing:
```bash
npm run seed
```

This will create 5 users and 10 books linked to those users in MongoDB Atlas.

---

## ⚙️ Environment Variables

Make sure your `.env` file includes:
```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 🧪 Testing Locally

```bash
npm install
npm start
```

---

## 📦 Tech Stack

- Node.js  
- Express.js  
- MongoDB Atlas  
- Mongoose  
- JWT  
- Bcrypt  
- Render (Deployment)  
- Faker.js (for seeding)
