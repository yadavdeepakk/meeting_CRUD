<h1 align="center">Meeting Scheduler Backend API</h1>

<p align="center">
A modular backend service built with Node.js, Express, TypeScript, Sequelize, and PostgreSQL.
</p>

<hr/>

<h2>Overview</h2>

<p>
This project is a backend service that allows users to schedule meetings while preventing overlapping time slots.
</p>

<p>
It follows a clean modular architecture with separation of concerns between controllers, services, models, and routes. JWT authentication is implemented to secure meeting operations.
</p>

<hr/>

<h2>Tech Stack</h2>

<ul>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>TypeScript</li>
  <li>Sequelize ORM</li>
  <li>PostgreSQL</li>
  <li>JWT Authentication</li>
  <li>Bcrypt (Password Hashing)</li>
</ul>

<hr/>

<h2>Project Structure</h2>

<pre>
src/
  config/
  middlewares/
  routes/
  utils/
  modules/
    meeting/
      index/
      dto/
      interface/
      module/
      service/
    user/
      index/
      dto/
      interface/
      module/
      service/
  app.ts
  server.ts
</pre>

<p>
Each module is self-contained and includes its controller (index), service layer, model definition, and data contracts.
</p>

<hr/>

<h2>Features</h2>

<ul>
  <li>User Registration</li>
  <li>User Login with JWT</li>
  <li>Password Hashing with Bcrypt</li>
  <li>Protected Routes using Middleware</li>
  <li>Create, Update, Delete Meetings (Authenticated)</li>
  <li>List and Get Meetings (Public)</li>
  <li>Prevention of Overlapping Time Slots</li>
</ul>

<hr/>

<h2>Business Rule</h2>

<p>
A user cannot create or update a meeting if it overlaps with an existing meeting.
</p>

<p>
Conflict condition:
</p>

<pre>
existing.startTime &lt; new.endTime
AND
existing.endTime &gt; new.startTime
</pre>

<p>
If conflict exists, the API returns:
</p>

<pre>
400 Bad Request
{
  "message": "Time slot already booked"
}
</pre>

<hr/>

<h2>Authentication Flow</h2>

<ol>
  <li>User registers with name, email, and password.</li>
  <li>Password is hashed using bcrypt.</li>
  <li>User logs in and receives a JWT token.</li>
  <li>Protected routes require Authorization header:</li>
</ol>

<pre>
Authorization: Bearer &lt;your_token&gt;
</pre>

<p>
The middleware verifies the token and extracts the user ID securely.
</p>

<hr/>

<h2>Getting Started</h2>

<h3>1. Clone the Repository</h3>

<pre>
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
</pre>

<h3>2. Install Dependencies</h3>

<pre>
npm install
</pre>

<h3>3. Create .env File</h3>

<p>Create a file named <strong>.env</strong> in the root directory and add:</p>

<pre>
PORT=5000
DB_HOST=localhost
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASS=your_database_password
JWT_SECRET=your_secret_key
</pre>

<h3>4. Create PostgreSQL Database</h3>

<p>Make sure PostgreSQL is installed and running.</p>

<p>Create a new database:</p>

<pre>
CREATE DATABASE your_database_name;
</pre>

<h3>5. Run the Application</h3>

<pre>
npm run dev
</pre>

<p>The server will start at:</p>

<pre>
http://localhost:5000
</pre>

<hr/>

<h2>API Endpoints</h2>

<h3>User Routes</h3>

<pre>
POST   /users/register
POST   /users/login
</pre>

<h3>Meeting Routes</h3>

<pre>
GET    /meetings
GET    /meetings/:id
POST   /meetings        (Protected)
PUT    /meetings/:id    (Protected)
DELETE /meetings/:id    (Protected)
</pre>

<hr/>

<h2>Testing the API</h2>

<p>You can use Thunder Client, Postman, or any REST client.</p>

<h4>Example: Create Meeting</h4>

<pre>
POST /meetings
Authorization: Bearer &lt;your_token&gt;

{
  "title": "Morning Meeting",
  "startTime": "2026-02-25T09:00:00.000Z",
  "endTime": "2026-02-25T10:00:00.000Z"
}
</pre>

<hr/>

<h2>Security Improvements</h2>

<ul>
  <li>JWT-based authentication</li>
  <li>Password hashing with bcrypt</li>
  <li>User ID extracted from token instead of request body</li>
  <li>Protected modification routes</li>
</ul>

<hr/>

<h2>Future Enhancements</h2>

<ul>
  <li>Pagination</li>
  <li>Soft Delete</li>
  <li>Rate Limiting</li>
  <li>Logging</li>
  <li>Unit Testing (Jest)</li>
</ul>

<hr/>

<h2>Author</h2>

<p>
Deepak Kumar Yadav
</p>
