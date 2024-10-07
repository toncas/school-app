const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const classroomRoutes = require('./routes/classroomRoutes');
const ensureAuthenticated = require('./middlewares/authMiddleware');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', ensureAuthenticated, userRoutes);
app.use('/api/classrooms', ensureAuthenticated, classroomRoutes);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;