const passport = require("passport");
const FacebookTokenStrategy = require("passport-facebook-token");
const { Strategy: GoogleTokenStrategy } = require("passport-google-token");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// FACEBOOK STRATEGY
const FacebookTokenStrategyCallback = (
  accessToken,
  refreshToken,
  profile,
  done
) =>
  done(null, {
    accessToken,
    refreshToken,
    profile,
  });

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: "359082502562746",
      clientSecret: "5578dbd38b608c2435e828c2ce071b7f",
    },
    FacebookTokenStrategyCallback
  )
);

// GOOGLE STRATEGY
const GoogleTokenStrategyCallback = (
  accessToken,
  refreshToken,
  profile,
  done
) =>
  done(null, {
    accessToken,
    refreshToken,
    profile,
  });

passport.use(
  new GoogleTokenStrategy(
    {
      clientID:
        "70921666007-tjuk7p5raec3ji4j8tor8k8ushp3lmuj.apps.googleusercontent.com",
      clientSecret: "fsQsUop0eSYO2Lj-EeWOjkkK",
    },
    GoogleTokenStrategyCallback
  )
);

// promisified authenticate functions
const authenticateFacebook = (req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(
      "facebook-token",
      { session: false },
      (err, data, info) => {
        if (err) reject(err);
        resolve({ data, info });
      }
    )(req, res);
  });

const authenticateGoogle = (req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(
      "google-token",
      { session: false },
      (err, data, info) => {
        if (err) reject(err);
        resolve({ data, info });
      }
    )(req, res);
  });

module.exports = { authenticateFacebook, authenticateGoogle };
