<h1 align="center">Meeting Scheduler Backend API</h1>

<p align="center">
A modular backend service built with Node.js, Express, TypeScript, Sequelize, and PostgreSQL.
</p>

<hr/>

<h2>1. Overview</h2>

<p>
This project is a backend service that allows users to schedule meetings while preventing overlapping time slots.
The system enforces strict business rules to ensure no user can create or update meetings that conflict with existing bookings.
</p>

<p>
The application follows a modular architecture with clear separation between controllers, services, models, and routes.
JWT authentication is implemented to secure meeting creation, updates, and deletion.
</p>

<hr/>

<h2>2. Tech Stack</h2>

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

<h2>3. Setup and Installation</h2>

<h3>3.1 Clone Repository</h3>

<pre>
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
</pre>

<h3>3.2 Install Dependencies</h3>

<pre>
npm install
</pre>

<h3>3.3 Environment Setup</h3>

<p>Create a <strong>.env</strong> file in the root directory:</p>

<pre>
PORT=5000

DB_HOST=localhost
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASS=your_database_password

JWT_SECRET=your_secret_key
</pre>

<h3>3.4 Database Setup</h3>

<p>Ensure PostgreSQL is installed and running.</p>

<p>Create a database:</p>

<pre>
CREATE DATABASE your_database_name;
</pre>

<hr/>

<h2>4. Migration and Run Commands</h2>

<p>
This project uses Sequelize for ORM and schema synchronization.
</p>

<h3>4.1 Development Sync</h3>

<p>
During development, <code>sequelize.sync()</code> is used to automatically create tables if they do not exist.
</p>

<pre>
npm run dev
</pre>

<p>
If schema changes are made and tables need to be recreated, use:
</p>

<pre>
sequelize.sync({ force: true })
</pre>

<p>
Note: This will drop and recreate tables. It should only be used in development.
</p>

<h3>4.2 Production Recommendation</h3>

<p>
In a production environment, proper migrations should be used instead of force sync.
</p>

<hr/>

<h2>5. Architecture and Module Design</h2>

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

<h3>5.1 Architectural Principles</h3>

<ul>
  <li><strong>Controller Layer:</strong> Handles HTTP request/response.</li>
  <li><strong>Service Layer:</strong> Contains business logic and validation.</li>
  <li><strong>Model Layer:</strong> Defines database schema using Sequelize.</li>
  <li><strong>Routes:</strong> Maps endpoints to controllers.</li>
  <li><strong>Middleware:</strong> Handles authentication and cross-cutting concerns.</li>
</ul>

<p>
This separation ensures maintainability, scalability, and testability.
</p>

<hr/>

<h2>6. Database Design</h2>

<h3>6.1 Tables</h3>

<h4>Users Table</h4>

<ul>
  <li>id (Primary Key, Auto Increment)</li>
  <li>name (Required)</li>
  <li>email (Required, Unique)</li>
  <li>password (Required, Hashed)</li>
  <li>createdAt</li>
  <li>updatedAt</li>
</ul>

<h4>Meetings Table</h4>

<ul>
  <li>id (Primary Key, Auto Increment)</li>
  <li>title (Required)</li>
  <li>startTime (Required)</li>
  <li>endTime (Required)</li>
  <li>userId (Foreign Key → Users.id)</li>
  <li>createdAt</li>
  <li>updatedAt</li>
</ul>

<h3>6.2 Relationships</h3>

<p>
One-to-Many relationship:
</p>

<ul>
  <li>One User can have many Meetings</li>
  <li>Each Meeting belongs to one User</li>
</ul>

<h3>6.3 Constraints</h3>

<ul>
  <li>Email must be unique.</li>
  <li>Foreign key constraint on userId.</li>
  <li>startTime must be earlier than endTime.</li>
  <li>No overlapping time slots for same user.</li>
</ul>

<h3>6.4 Business Logic Reasoning</h3>

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

<h2>7. API Documentation</h2>

<h3>7.1 User Routes</h3>

<h4>Register</h4>

<pre>
POST /users/register
</pre>

Request:

<pre>
{
  "name": "John",
  "email": "john@example.com",
  "password": "123456"
}
</pre>

Response:

<pre>
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John",
    "email": "john@example.com"
  }
}
</pre>

<h4>Login</h4>

<pre>
POST /users/login
</pre>

<h3>7.2 Meeting Routes</h3>

<h4>Create Meeting (Protected)</h4>

<pre>
POST /meetings
Authorization: Bearer &lt;token&gt;
</pre>

Request:

<pre>
{
  "title": "Morning Meeting",
  "startTime": "2026-02-25T09:00:00.000Z",
  "endTime": "2026-02-25T10:00:00.000Z"
}
</pre>

Response:

<pre>
201 Created
</pre>

<h4>List Meetings</h4>

<pre>
GET /meetings
</pre>

<h4>Update Meeting (Protected)</h4>

<pre>
PUT /meetings/:id
Authorization: Bearer &lt;token&gt;
</pre>

<h4>Delete Meeting (Protected)</h4>

<pre>
DELETE /meetings/:id
Authorization: Bearer &lt;token&gt;
</pre>

<hr/>

<h2>8. Assumptions</h2>

<ul>
  <li>Each meeting belongs to a single user.</li>
  <li>Time values are provided in ISO format.</li>
  <li>Timezone handling is managed by UTC format.</li>
  <li>No recurring meetings are implemented.</li>
</ul>

<hr/>

<h2>9. Trade-offs</h2>

<ul>
  <li>Used sequelize.sync() for simplicity instead of full migration system.</li>
  <li>JWT access tokens only (no refresh token implementation).</li>
  <li>Conflict checking handled at application layer instead of DB-level constraints.</li>
</ul>

<hr/>

<h2>10. Bonus Features Implemented</h2>

<ul>
  <li>JWT Authentication</li>
  <li>Password Hashing with Bcrypt</li>
  <li>Protected Routes via Middleware</li>
  <li>Secure userId extraction from token</li>
  <li>Modular Clean Architecture</li>
</ul>

<hr/>

<h2>Author</h2>

<p>
Deepak Kumar Yadav
</p>
