const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const jwks = require('jwks-rsa');
const JwksRsa = require('jwks-rsa');
const shortId = require('shortid');

const User = require('../models/User');


 // Authentication middleware
 // Check for bearer jwt in headers
exports.checkJwt = expressJwt({
  secret: JwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: 'https://arturofilio.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://arturofilio.us.auth0.com/api/v2/',
  issuer: 'https://arturofilio.us.auth0.com/',
  algorithms: ['RS256']
})

exports.checkRole = role => (req, res, next) => {
  const user = req.user;
  if (user && user[process.env.AUTH0_NAMESPACE + '/roles'].includes(role)) {
    next();
  } else {
    return res.status(401).send("You are not authorized to access this resource");
  }
}

exports.signup = (req, res) => {
  User.findOne({email: req.body.email}).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: 'Email is taken'
      })
    }

    const {name, email, password} = req.body;
    let username = shortId.generate()
    let newUser = new User({name, email, password, username})
    newUser.save((err, success) => {
      if (err) {
        return res.status(400).json({error: err})
      }
      res.json({user: success})
      // res.json({message: "Signup was successful!"})
    })
  })
}

exports.signin = (req, res) => {
  const {email, password} = req.body;
  User.findOne({email}).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({error: "User wasn't found"})
    } 
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: 'Email and password do not match'
      });
    }

    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
    res.cookie('token', token, {expiresIn: '1d'})
    const {_id, username, name, email, role} = user;
    return res.json({
      token,
      user: {_id, username, name, email, role}
    })
  })
}