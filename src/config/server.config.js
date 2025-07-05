const dotenv = require("dotenv")

dotenv.config()
console.log('server.config MONGO_URI:', process.env.MONGODB_URI);


module.exports = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGODB_URI,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
}