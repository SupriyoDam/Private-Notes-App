# 🗒️ Private Notes App

A secure and minimal **Notes App** built with **Node.js, Express, Sequelize, and AWS S3**, supporting:
- User registration & login with JWT
- Authenticated CRUD operations on notes
- Attachments uploaded to S3
- Downloadable private files via signed URLs
- Swagger API documentation

---

## 🚀 Features

- ✅ JWT-based User Authentication
- 📄 Notes CRUD (Create, Read, Update, Delete)
- 🔐 Private File Upload & Access via AWS S3
- 🔄 Add multiple files to a note
- 📥 Download notes with secure links
- 📘 Swagger API Docs
- 🛡️ Role-based access (in progress)

---

## 🛠️ Tech Stack

| Layer       | Technology                     |
|------------|---------------------------------|
| Backend     | Node.js, Express               |
| ORM         | Sequelize + MySQL   |
| Auth        | JWT                            |
| File Storage| AWS S3                         |
| Docs        | Swagger + swagger-jsdoc        |
| Upload      | Multer                         |
| Validation  | Express Validator              |

---

## 📁 Folder Structure

├── config/ # DB and S3 config
├── controllers/ # Business logic
├── models/ # Sequelize models
├── routes/ # Route definitions
├── middleware/ # Auth middleware
├── uploads/ # Temp upload directory (local)
├── docs/ # Swagger setup
├── app.js # App entry point
└── README.md


---

## 📦 Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/private-notes-app.git
cd private-notes-app
npm install
```

### 2. Configure Environment Variables
Create a .env file in the root:
```env
PORT=5000
DB_NAME=your_db
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=localhost

JWT_SECRET=your_jwt_secret

AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=your_aws_region
S3_BUCKET_NAME=your_s3_bucket
```

### 3. Database Setup
Ensure you have a database running and configured. Then run:

```bash
npx sequelize-cli db:migrate
```
Or manually create the tables using Sequelize sync in code if you’re not using migrations.


### 4. Run the App
```bash
npm start
```
Server runs on http://localhost:5000

### 5. Visit Swagger Docs

Swagger API docs available at:

```bash
http://localhost:5000/api-docs
```
You can use this to test all endpoints directly from the browser.

## ✅ To Do

- [x] User authentication
- [x] Create, Read, Update, Delete Notes
- [x] AWS S3 file upload
- [x] Add attachments to existing notes
- [x] Swagger API Docs for Notes
- [ ] User profile image addition
- [ ] Role-based access (Admin/Users)
- [ ] Frontend client (React)

## 🤝 Contributing
PRs welcome! Please fork the repo and submit a pull request.

## 📄 License
MIT License © Supriyo

## 💬 Feedback
Feel free to open an issue or ping me on GitHub if you have any questions or suggestions.