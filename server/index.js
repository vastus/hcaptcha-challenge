const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const hcaptcha = require('express-hcaptcha');
const jwt = require('express-jwt');
const jwksRSA = require('jwks-rsa');

const {get} = require('./utils');

const PORT = process.env.PORT || 8080;
const AUDIENCE = get(process.env, 'AUTH0_CLIENT_ID');
const SECRET = get(process.env, 'HCAPTCHA_SECRET_KEY');

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());

const checkJWT = jwt({
  // dynamically provide a signing key based on the kid
  // in the header and the signing keys provided by the JWKS endpoint
  secret: jwksRSA.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 35,
    jwksUri: `https://vastus.eu.auth0.com/.well-known/jwks.json`
  }),

  // validate the audience and the issuer
  audience: AUDIENCE,
  issuer: `https://vastus.eu.auth0.com/`,
  algorithms: ['RS256']
});

// use the validate middleware on this route
app.post('/verify', hcaptcha.middleware.validate(SECRET), (req, res) => {
  res.json({message: 'all good', hcaptcha: req.hcaptcha});
});

// authorize requests with valid JWT
app.get('/howdy', checkJWT, (req, res) => {
  res.end('Hello World');
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
