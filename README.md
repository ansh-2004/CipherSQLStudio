# CipherSQLStudio

It is a browser-based SQL learning platform where students can practice SQL queries against pre-configured assignments with real-time execution and intelligent hints

---

## Features

- Assignment Listing Page
- Assignment Attempt Interface
- SQL Editor (Monaco Editor)
- PostgreSQL query execution engine
- Result display
- LLM Hint Integration (Gemini)
- Query Validation and Sanitization
- Login / Signup System 
- Saving user's SQL query attempts for each assignment

---

## Tech Stack
Frontend:
- React.js
- SCSS (mobile-first, BEM methodology)
- Monaco Editor

Backend:
- Node.js
- Express.js
- PostgreSQL (Sandbox execution)
- MongoDB Atlas (Assignments & UserProgress)
- Gemini API (Hint generation)

--

## Project Structure
backend/
frontend/

Backend :
- config/
- controllers/
- middleware/
- models/
- routes/

Frontend :
- components/
- pages/
- services/
- styles/

-- 

## Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/ansh-2004/CipherSchoolsSQLStudio.git
cd CipherSchoolsSQLStudio
```

### 2. Backend Setup
```bash
cd backend
npm install
```
- create .env from .env.examples

#### Environment Variables
- mongoURL=mongodb+srv://your_mongo_connection_string
- user=your_postgres_username
- password=your_password (type your postgres password)
- apikey=your_gemini_api_key (Generate a gemini key from google studio https://aistudio.google.com/)
- secretkey=your_jwt_secret_key


```bash
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Database Setup
- Import AssignmentData.json file (given in the repo) manually on the MongoDB Atlas 


## Technology Choices Explanation

- React was chosen for the UI development and handle state management
- SCSS was used instead of UI libraries to demonstrate core styling ability using variables, mixins, and responsive breakpoints.
- PostgreSQL was selected for real SQL execution in a sandboxed schema-based environment.
- MongoDB is used for storing assignment metadata and user progress.
Gemini API is used for intelligent hint generation.