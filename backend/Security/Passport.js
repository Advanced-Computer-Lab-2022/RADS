const Trainee = require("../Models/traineeModel");
const Instructor = require("../Models/instructorModel");
const corpTrainee = require("../Models/corpTraineeModel");
const Admin = require("../Models/adminModel");


var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.PRIVATE_KEY;

module.exports = passport => {
  passport.use('jwt',
    new JwtStrategy(opts, async (payload, done) => {
      await Trainee.findById(payload.id)
        .then(async user => {
          if (user) {
            return done(null, user);
          } else {
            await Instructor.findById(payload.id)
              .then(async user => {
                if (user) {
                  return done(null, user);
                } else {
                  await Admin.findById(payload.id)
                    .then(async user => {
                      if (user) {
                        return done(null, user);
                      } else {
                        await corpTrainee.findById(payload.id)
                          .then(async user => {
                            if (user) {
                              return done(null, user);
                            } else {
                              return done(null, false);
                            }
                          })
                          .catch(err => {
                            return done(null, false);
                          });
                      }
                    })
                    .catch(err => {
                      return done(null, false);
                    });
                }
              })
              .catch(err => {
                return done(null, false);
              });
          }
        })
        .catch(err => {
          return done(null, false);
        });
    })
  );
};