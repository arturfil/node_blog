 const jwt = require('express-jwt');
 const jwks = require('jwks-rsa');
const JwksRsa = require('jwks-rsa');

 // Authentication middleware
 // Check for bearer jwt in headers
exports.checkJwt = jwt({
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
