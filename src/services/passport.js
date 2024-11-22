import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';

import User from '../models/user_model';

// loads in .env file if needed
dotenv.config({ silent: true });

// options for local strategy, we'll use email AS the username
// not have separate ones
const localOptions = { usernameField: 'email' };

// options for jwt strategy
// we'll pass in the jwt in an `authorization` header
// so passport can find it there
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.AUTH_SECRET,
};
// NOTE: we are not calling this a bearer token (although it technically is), if you see people use Bearer in front of token on the internet you could either ignore it, use it but then you have to parse it out here as well as prepend it on the frontend.


// username/email + password authentication strategy
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
  // 🚀 TODO: should find user by email and check password

  try {
      const user = await User.findOne({ email }); 
      if (!user){
          return done(null, "no user found");
      }
      const isMatch = await user.comparePassword(password);
      if (isMatch) {
          return done(null, user);
      } else {
          return done(null, false);
      }
  } catch (error) {
      return done(error);
  }

});

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  // 🚀 TODO: is called with confirmed jwt we just need to confirm that user exits

  try {
    let user = await User.findById(payload.sub); 
    if (user){
        done(null, user);
     } else{
        done(null, false)
     }     
  } catch (error) {
      done(error, false);
  }
});

// Tell passport to use this strategy
passport.use(jwtLogin); // for 'jwt'
passport.use(localLogin); // for 'local'

// middleware functions to use in routes
export const requireAuth = passport.authenticate('jwt', { session: false });
export const requireSignin = passport.authenticate('local', { session: false });