require('dotenv').config();

const express = require('express');
const cors = require('cors'); // ← import it

const app = express();
app.use(cors());              // ← allow requests from all origins
app.use(express.json());

const cookieParser = require('cookie-parser');

const connectDB = require('./config/db.config');
const { PORT } = require('./config/server.config');
const apiRouter = require('./routes');
const errorMw = require('./middlewares/error.middleware');

// Middlewares
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check route
app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'Pong' });
});

// API routes
app.use('/api', apiRouter);

// Error handler
app.use(errorMw);

// Start server only after DB connects
(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Express server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Server startup failed:', err.message);
    process.exit(1);
  }
})();