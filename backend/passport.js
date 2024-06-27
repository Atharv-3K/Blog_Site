const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {User} = require('./db');
const dotenv = require('dotenv');
dotenv.config();

// const adminEmails = process.env.ADMIN_EMAILS.split(',');
passport.use('google-user', new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL+"/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});
