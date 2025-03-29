# Expense-tracker

Expense Tracker App
Introduction
The Expense Tracker App helps users manage expenses by 
categorizing them and tracking their budget. It uses Node.
js, Express, PostgreSQL, and follows the MVC architecture, 
with routes and controllers combined.

MVC Architecture
Models
The model directory contains files for categories, budgets, 
expenses, and users, handling their respective database 
operations.

Routes and Controllers
The routes directory combines routes and controllers for 
budgets, categories, expenses, and users, managing their 
respective endpoints.

Database Connection
The app uses the pg library to connect to PostgreSQL. Ensure 
the database is set up and running.

Authentication
Passport.js Setup
Local strategy with Passport.js handles authentication. The 
middleware req.isAuthenticated() ensures protected routes 
are accessed only by authenticated users.

Session Management
Sessions are managed using express-session to maintain user 
login state across requests.

Running the App
Clone the repository.

Install dependencies.

Set up the database.

Start the app.

Stay tuned for updates, as work on the view session will 
begin soon. Enjoy using the Expense Tracker App!

The Budget component works, it creates a budget and stores it in the db.
The req.user problem fixed by moving the dashboard route at the top.

Implemented the logout with session destroyed.

Things to do:

-Add delete budget route; (Done)
-Add edit budget
-Add expenses? 

