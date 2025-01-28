require('dotenv').config();

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const PORT = 5000;
const { initializePassport }  = require('./model/config/passport');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

initializePassport(passport);

// Routes
const usersRoute = require('./routes/usersRoute');
const expensesRoute = require('./routes/expensesRoute');
const categoriesRoute = require('./routes/categoriesRoute');
const budgetsRoute = require('./routes/budgetsRoute');
// const dashboardRoute = require('./routes/dashboardsRoute');

// Use routes
app.use('/users', usersRoute);
app.use('/expenses', expensesRoute);
app.use('/categories', categoriesRoute);
app.use('/budgets', budgetsRoute);
// app.use('/dashboard', dashboardRoute);


app.get('/', (req, res) => {
    res.send('Welcome to the expense tracker app!');
});


app.listen(PORT, () => {
    console.log('Server listening on port', PORT);
});



