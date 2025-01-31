// this allows for the json web token to be accessed from a .env file stored on the remote production server (wtwr.theoceanforest.com)
// this json web token stored on the remote production server is a pseudorandom cryptographically strong key generated on 1/26/2025
// via the following method " node -e "console.log(require('crypto').randomBytes(32).toString('hex'));" "
// the json web token is a random 64-character string in hexadecimal format representing 32 random bytes

// if "process.env" doesn't have a value for "JWT_SECRET",
// then use "super-strong-secret" as the default value for JWT_SECRET
const { JWT_SECRET = "super-strong-secret" } = process.env;

module.exports = { JWT_SECRET };
