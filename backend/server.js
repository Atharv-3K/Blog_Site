const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors'); // Import cors module
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const session = require('express-session'); 
// const passport = require('passport');
require('./passport');

dotenv.config();
const { db, User,Blog } = require('./db'); // Adjust path as per your folder structure

const app = express();
const port = 5000;

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: true 
  }
}));


app.use(bodyParser.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from localhost:3000
  methods: ['GET', 'POST','DELETE'], // Allow methods
  allowedHeaders: ['Content-Type'], // Allow headers
  credentials: true, // Allow credentials
}));
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
  passport.authenticate('google-user', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google-user', { failureRedirect: process.env.FRONTEND_URL+'/login',session: false}),
  async (req, res) => {
  try {
    let user = await User.findOne({ email: req.user.emails[0].value});
    if(user)req.user._id=user._id;
    
    if (!user) {
      user = new User({
        email:req.user.emails[0].value,
        username: req.user.displayName,
      });
      
      await user.save();
      req.user._id=user._id;
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
    console.log(req.user);
    const token = jwt.sign({id:req.user._id,email:req.user.emails[0].value,username:req.user.displayName}, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.cookie('token', token, { httpOnly: false, secure: false});
    console.log(token);
    res.redirect(process.env.FRONTEND_URL + '/dashboard');
        }
);

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log('No token found');
    return res.redirect(process.env.FRONTEND_URL + '/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

app.post('/login',async(req,res)=>{
  const {username,password}=req.body;
  try{
    const user = await User.findOne({ username:username });
    if(user){
      if(user.password===password){
        const token = jwt.sign({id:user._id,email:user.email,username:user.username}, process.env.JWT_SECRET, {
          expiresIn: '1h',
        });
        res.cookie('token', token, { httpOnly: false, secure: false});
        return res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
      }
      // res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
    }else{
      return res.status(404).json({ message: 'User not found', redirectUrl: `${process.env.FRONTEND_URL}/signup` });
    }
  }catch(e){

  }

});


// Signup route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if username already exists
    const existingUser = await User.findOne({ email: email});
    if (existingUser) {
      return res.status(400).json('Username already exists');
    }
    
    // Create a new user instance
    const newUser = new User({ username, email, password });
    console.log(newUser.username);
    
    // Save the new user to the database
    console.log(newUser.password);
    await newUser.save();
    console.log(newUser.email);
    // Respond with success message
    res.status(200).json('User created successfully');
  } catch (error) {
    res.status(500).json('Error: ' + error.message);
  }
});

app.get('/dashboard',verifyUser,async (req,res)=>{
  try{
  const blogs = await Blog.find();
  if(!blogs)res.json([]);
  res.json(blogs);
  }catch(e){
    res.status(500).json('Error: ' + e.message);
  
  }
});

app.get('/Your_blogs',verifyUser,async (req,res)=>{
  try{
    // console.log(req.user);
  const blogs = await Blog.find({email:req.user.email});
  // console.log(blogs);
  if(!blogs)res.json([]);
  res.json(blogs);
  }catch(e){
    res.status(500).json('Error: ' + e.message);
  
  }
});

app.post('/delete',verifyUser,async (req,res)=>{
  try{
    console.log(req.body.id);
  const blog = await Blog.findOneAndDelete({_id:req.body.id});
  if(!blog)return res.json('Blog not found');
  if(blog.email!==req.user.email)return res.json('You are not authorized to delete this blog');
  // console.log("this",blog);
  // await blog.remove();
  res.json('Blog deleted successfully');
  }catch(e){
    res.status(500).json('Error: ' + e.message);
  
  }

});

app.post('/create',verifyUser,async (req,res)=>{
  const {title,content}=req.body;
  console.log(req.user);
  const newBlog = new Blog({
    title:title,
    content:content,
    date: new Date(),
    Author : req.user.username,
    email : req.user.email,
  });

  await newBlog.save();
  res.json(newBlog);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

