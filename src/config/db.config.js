const mongoose = require("mongoose")
const logger = require("../utils/logger")
const { MONGO_URI } = require("./server.config")

async function connectDB() {
  logger.info('Connecting to DB...')
  console.log('MONGODB_URI:', process.env.MONGODB_URI);
  console.log('MONGO_URI from config file:', MONGO_URI);
  await mongoose.connect(MONGO_URI)
  logger.info('Connected to DB 🔥')
}

module.exports = connectDB