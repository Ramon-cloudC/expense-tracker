require('dotenv').config();

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const PORT = 5000;
const { initializePassport }  = require('./model/config/passport');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 },
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


// Use routes
app.use('/users', usersRoute);
app.use('/expenses', expensesRoute);
app.use('/categories', categoriesRoute);
app.use('/budgets', budgetsRoute);



app.get('/', (req, res) => {
    res.send('Welcome to the expense tracker app!');
});


app.listen(PORT, () => {
    console.log('Server listening on port', PORT);
});



