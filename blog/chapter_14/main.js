// Importing required modules
const express = require('express');  // Express framework for routing and handling HTTP requests
const path = require('path');  // Module for working with file paths
const newPostController = require('./controllers/newPost');  // Controller for rendering new post form
const newUserController = require('./controllers/newUser');  // Controller for rendering new user registration form
const storeUserController = require('./controllers/storeUser');  // Controller for storing new user data
const storePostController = require('./controllers/storePost');  // Controller for storing new blog post
const loginController = require('./controllers/login');  // Controller for rendering login page
const loginUserController = require('./controllers/loginUser');  // Controller for logging in a user
const authMiddleware = require('./middleware/authMiddleware');  // Middleware for authentication checks
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');  // Middleware to redirect if already authenticated
const logoutController = require('./controllers/logout');  // Controller for handling user logout
const flash = require('connect-flash');  // Flash messaging for temporary notifications (e.g., error messages)
const session = require('express-session');  // Session handling for user login states
const bodyParser = require('body-parser');  // Middleware for parsing request bodies
const mongoose = require('mongoose');  // MongoDB connection and schema management
const BlogPost = require('./models/BlogPost');  // MongoDB model for blog posts
const fileUpload = require('express-fileupload');  // Middleware for handling file uploads

const app = express();
const ejs = require('ejs');  // Template engine for rendering views

app.set('view engine', 'ejs');  // Set EJS as the view engine

// Middleware configuration
app.use(express.static('public'));  // Serve static files from 'public' directory
app.use(bodyParser.json());  // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));  // Parse URL-encoded bodies

// MongoDB connection setup
mongoose.connect('mongodb://localhost/my_blog', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const PORT = 4000;  // Port for the server to listen on

// Session middleware configuration (store session data on the server)
app.use(session({
    secret: 'your-secret-key',  // Secret key for encrypting session data
    resave: false,  // Don't save session if unmodified
    saveUninitialized: false  // Don't save uninitialized sessions
}));

// Flash messaging middleware
app.use(flash());  // Initialize flash messages

// Global variable for storing logged-in user ID
global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;  // Assign logged-in user ID to global variable
    next();
});

// File upload middleware setup
app.use(fileUpload());

// Start server and listen on specified port
app.listen(PORT, () => {
    console.log('App listening on port 4000');  // Log when server is up
});

// Routes

// Home page, fetch all blog posts from database
app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({});  // Fetch all blog posts
    res.render('index', {
        blogposts: blogposts  // Render index.ejs and pass blog posts data
    });
});

// About page
app.get('/about', (req, res) => {
    res.render('about');  // Render about page
});

// Contact page
app.get('/contact', (req, res) => {
    res.render('contact');  // Render contact page
});

// Sample post page
app.get('/samplepost', (req, res) => {
    res.render('samplepost');  // Render samplepost page
});

// Single blog post page, fetch specific post by ID
app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id);  // Fetch specific post by ID
    res.render('post', {
        blogpost: blogpost  // Render post page with fetched blog post
    });
});

// Show new post form
app.get('/posts/new', newPostController);

// Create page
app.get('/create', (req, res) => {
    res.render('create');  // Render create page for new post creation
});

// Store new post, handle file upload and save post to database
app.post('/posts/store', async (req, res) => {
    try {
        let image = req.files.image;  // Get uploaded image file
        await image.mv(path.resolve(__dirname, 'public/img', image.name));  // Move the file to public folder
        await BlogPost.create({
            ...req.body,  // Save form data to blog post
            image: '/img/' + image.name  // Store image path in the database
        });
        res.redirect('/');  // Redirect to home page after successful post creation
    } catch (error) {
        console.error(error);  // Log error if file upload or post creation fails
        res.status(500).send('Internal Server Error');  // Respond with an error message
    }
});

// Registration routes
app.get('/auth/register', newUserController);
app.post('/users/register', storeUserController);

// Login routes
app.get('/auth/login', loginController);
app.post('/users/login', loginUserController);

// Logout route
app.get('/auth/logout', logoutController);

// Middleware protected route for creating posts
app.get('/posts/new', authMiddleware, newPostController);

// Store post route with authentication check
app.post('/posts/store', authMiddleware, storePostController);

// Redirect if already authenticated
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);

// Logout route
app.get('/auth/logout', logoutController);

// 404 page for undefined routes
app.use((req, res) => res.render('notfound'));  // Render notfound page for non-existent routes
