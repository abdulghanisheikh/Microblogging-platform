# 📝 Microblogging Platform

A simple microblogging web application where user can post and manage short blogs.

## 🔧 Tech Stack

- **Frontend:** EJS, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT & Cookies
- **Session Management:** Cookie-based.
- **Security:** bcrypt for password hashing.

## ✨ Features

- ✅ User registration & login (JWT authentication)
- ✅ Create, Like, delete posts
- ✅ Protected routes for authenticated users
- ✅ Error handling and validation

## 📸 Screenshots

> # Home
> <img width="1919" height="866" alt="image" src="https://github.com/user-attachments/assets/16b15a59-550d-4ce4-bc0b-d7aaed72b7e1" />

> # Login
> <img width="1919" height="859" alt="image" src="https://github.com/user-attachments/assets/660a3d84-b245-4935-8e54-83098c328a53" />

> # Register
> <img width="1917" height="860" alt="image" src="https://github.com/user-attachments/assets/40ea2f48-80cf-414f-b471-2436bae2db96" />

> # Profile
> <img width="1919" height="865" alt="image" src="https://github.com/user-attachments/assets/871bb80b-218c-4ad0-82b3-13da36866caf" />




## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed or use [MongoDB Atlas](https://www.mongodb.com/atlas)

### Installation

```bash
git clone https://github.com/abdulghanisheikh/microblogging-platform.git
cd microblogging-platform
npm install
```

## 🛡️ Security

- Passwords are hashed using **bcrypt**
- Routes are protected using middleware
- JWT tokens are stored securely in **httpOnly cookies**

## 📬 API Endpoints

| Method | Endpoint        | Description         |
|--------|------------------|---------------------|
| POST   | `/register`      | Register user       |
| POST   | `/login`         | Login and get token |
| POST   | `/post`          | Create new post     |
| DELETE | `/post/:id`      | Delete post         |

## 🙌 Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [JWT](https://jwt.io/)

## 🧑‍💻 Author

**Abdul Ghani**  
_Web Developer_  
[GitHub Profile](https://github.com/abdulghanisheikh)
