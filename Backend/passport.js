var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
//var db = require("../app/db");
var config = require("./settings");
var User = require("./models/UserModel");
// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: "xyz"
  };
  passport.use(
    new JwtStrategy(opts, function(jwt_payload, callback) {
      User.findOne({ _id: jwt_payload.id }).then(user => {
        if (!user) {
          callback(null, false);
        }
        callback(null, true);
      });
    })
  );
};