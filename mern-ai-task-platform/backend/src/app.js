const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const authRoutes = require('../routes/authRoutes');
const taskRoutes = require('../routes/taskRoutes');

const app = express();

// DB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Test route
app.get('/', (req, res) => {
  res.send('API Running');
});

app.use('/api/auth', authRoutes);
const taskLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20
});

app.use('/api/tasks', taskLimiter, taskRoutes);
module.exports = app;