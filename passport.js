const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const User = require('./models/User')

const cookiesExtractor = (req) => {
    let token = null
    if(req && req.cookies) {
        token = req.cookies['access_token']
    }
    return token
}


passport.use(new JWTStrategy({
    jwtFromRequest: cookiesExtractor,
    secretOrKey: 'komsomolradio'
}, (payload, done) => {
    User.findOne({_id: payload.sub}, (err, foundUser) => {
        if (err)
            return done(err)
        if (!foundUser)
            return done(null, false)
        return done(null, foundUser)
    })
}))


passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({username}, (err, foundUser) => {
        if (err) 
            return done(err)
        if (!foundUser)
            return done(null, false)
        foundUser.comparePassword(password, done)
    })
}) )
