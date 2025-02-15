const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const User = require('./models/user');

const authRoutes = require('./routes/auth');

const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/register-login-page')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: true,
}));

// Set view engine
app.set('view engine', 'ejs');

// Default route to redirect to /register
app.get('/', (req, res) => {
  res.redirect('/register');
});

// Routes
app.use('/', authRoutes);

// Start the server
app.listen(8080, () => {
  console.log('Server started on http://localhost:8080');
});
