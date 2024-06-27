// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydata', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connected successfully');
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  Author: String,
  date: Date,
  email: String,
});

const User = mongoose.model('User', userSchema);
const Blog = mongoose.model('Blog', blogSchema);

module.exports = { db, User, Blog};
