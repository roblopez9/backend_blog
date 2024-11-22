# Blog Backend Platform

This is the backend application for the Blog platform, handling API requests, authentication, and database interactions. It powers the frontend application with a robust and scalable architecture.

---

## Features

- **CRUD Operations:** Create, read, update, and delete blog posts.
- **User Authentication:** Secure user authentication with token-based sessions.
- **Post Associations:** Link posts with their respective authors.
- **Error Handling:** Comprehensive error handling for robust API responses.
- **Middleware:** Modular middleware for authentication and validation.
- **Database Integration:** MongoDB for efficient data storage and retrieval.

---

## Tech Stack

### Backend
- **Node.js:** JavaScript runtime for building server-side applications.
- **Express.js:** Minimal and flexible web framework.
- **MongoDB:** NoSQL database for storing posts and user data.
- **Mongoose:** ODM library for MongoDB interactions.

---

## Prerequisites

Ensure you have the following installed before starting:
- [Node.js](https://nodejs.org) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (Cloud or Local)

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/blog-backend.git
cd blog-backend

Procfile for Heroku included
Settings for render.com:
* build command:  `npm install && npm run build`
* run command:  `npm run prod`
```
### .env file
First off, make it (file called .env located in the root folder) Now, paste the following into your .env file


MONGODB_URI = mongodb+srv://robrl9:robrl9@postmodel.fcm4u.mongodb.net/?retryWrites=true&w=majority&appName=PostModel
AUTH_SECRET="yourownsecret"

