const express = require('express');
const { createClassroom, addStudentToClassroom } = require('../controllers/classroomController');
const ensureAuthenticated = require('../middlewares/authMiddleware');
const router = express.Router();

// Create a classroom (only for teachers)
router.post('/create', ensureAuthenticated, createClassroom);

// Add a student to a classroom (only for teachers)
router.post('/add-student', ensureAuthenticated, addStudentToClassroom);

module.exports = router;
