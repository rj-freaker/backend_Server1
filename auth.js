const passport = require('passport');
const Person = require('./models/Person');
const localStrategy = require('passport-local').Strategy;

passport.use(new localStrategy (async (userName, password, done) => {
    try{
        const user = await Person.findOne({userName: userName});

        if(!user){
            return done(null, false, {message: 'Not registered'});
        }

        const isPasswordMatch = await user.comparePassword(password);

        if(isPasswordMatch){
            return done(null, user);
        }
        else{
            return done(null, false, {message: 'Incorrect Password'});
        }
    }catch(err){
        done(err);
    }
}));

module.exports = passport;