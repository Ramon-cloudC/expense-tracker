// config passport-loacl strategy for username and password authentication
// I need to retrieve the findUserByUsername 
const LocalStrategy = require('passport-local').Strategy;
const { findUserByUsername, findUserById } = require('../userModel');
const bcrypt = require('bcrypt');
const passport = require('passport');


const initializePassport = (passport) => {
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try{
                const user = await findUserByUsername(username);
                // console.log(user.user_id);
                if(!user){
                   
                    return done(null, false, {message: 'Invalid username or password'});
                }
                const isPasswordCorrect = await bcrypt.compare(password, user.password);
                if(!isPasswordCorrect){
                    return done(null, false, {message: 'Invalid username or password'});
                }

                return done(null, user);
            } catch(err){
                return done(err);
            }
        })
    )
};

// Serialize user into the session after login
passport.serializeUser((user, done) => {
    // console.log('serializing user', user);
    done(null, user.user_id);
  });

  // Deserialize user from the session
  passport.deserializeUser(async (id, done) => {
    // console.log('deserializing user with ID: ', id)
    try {
      const user = await findUserById(id); // Add a `findUserById` function in the User model
    //   console.log('user found: ', user )
    if (!user) return done(null, false); 
      done(null, user);
    } catch (err) {
      done(err);
    }
  });


module.exports = {
    initializePassport,
};
