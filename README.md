<h1> 📅 Meeting Scheduler Backend <h1/>

A backend service built using Node.js, TypeScript, Express, Sequelize, and PostgreSQL that allows users to schedule meetings while preventing overlapping time slots.

 <h3>🚀 Tech Stack </h3>

 Node.js <br/>
TypeScript <br/>
Express <br/>
Sequelize ORM <br/>
PostgreSQL <br/>

📦 Installation & Setup <br/>
1️⃣ Clone the repository <br/>
git clone <your-repo-link> <br/>
2️⃣ Install dependencies <br/>
npm install <br/>
3️⃣ Setup Environment Variables <br/>

Create a .env file in the root directory: <br/>

PORT=5000 <br/>
DB_NAME=meeting_scheduler <br/>
DB_USER=postgres <br/>
DB_PASS=your_password <br/>
DB_HOST=localhost <br/>

4️⃣ Setup PostgreSQL Database <br/>

Open PostgreSQL and create a database:

CREATE DATABASE meeting_scheduler;
5️⃣ Run the project
npm run dev

Server will run at:

http://localhost:5000
<br/>
🏗 Architecture Overview

The project follows a clean modular architecture: <br/>

src/ <br/>
  config/        → Database configuration <br/>
  routes/        → Route registration <br/>
  modules/ <br/>
    user/ <br/>
       index/     → Controllers <br/>
       service/   → Business logic <br/>
       module/    → Sequelize models <br/> <br/>
   meeting/ <br/>
      index/ <br/>
      service/ <br/>
      module/ <br/>
      dto/ <br/>
      interface/ <br/>
      
<h3> Layer Responsibilities <h3/>

Controller Layer → Handles HTTP requests/responses

Service Layer → Business logic & validation

Model Layer → Sequelize DB models

Routes Layer → Registers endpoints

📌 Business Rule (Important)
❌ No Time Conflicts Allowed

A user cannot create or update overlapping meetings.

Conflict Condition:
existing.start < new.end
AND
existing.end > new.start

If conflict exists:

400 Bad Request
{
  "message": "Time slot already booked"
}

This logic is implemented inside the service layer.

API Documentation
User APIs
Create User
