const { startSession } = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const jwtStrategy = require("passport-jwt").Strategy;
const User = require("./models/user");

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

passport.use(
  new jwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: "karan123",
    },
    (payload, done) => {
      User.findById({ _id: payload.sub }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  )
);

passport.use(
  new localStrategy((username, password, done) => {
    User.findOne(
      {
        username,
      },
      (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        user.comparePassword(password, done);
      }
    );
  })
);
