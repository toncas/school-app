// src/controllers/classroomController.js

const Classroom = require('../models/Classroom');
const User = require('../models/User');

// Create a classroom
exports.createClassroom = async (req, res) => {
  try {
    const { name } = req.body;
    const teacherId = req.user.userId;

    // Ensure the user is a teacher
    if (req.user.userType !== 'teacher') {
      return res.status(403).json({ message: 'Only teachers can create classrooms' });
    }

    const classroom = new Classroom({
      name,
      teacher: teacherId,
    });

    await classroom.save();
    res.status(201).json({ message: 'Classroom created successfully', classroom });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Add a student to the classroom
exports.addStudentToClassroom = async (req, res) => {
  try {
    const { classroomId, studentId } = req.body;

    // Ensure the user is a teacher
    if (req.user.userType !== 'teacher') {
      return res.status(403).json({ message: 'Only teachers can add students to classrooms' });
    }

    // Find the classroom
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    // Ensure the student exists and is a student
    const student = await User.findById(studentId);
    if (!student || student.userType !== 'student') {
      return res.status(400).json({ message: 'Invalid student ID' });
    }

    // Add student to the classroom if not already added
    if (!classroom.students.includes(studentId)) {
      classroom.students.push(studentId);
      await classroom.save();
    }

    res.status(200).json({ message: 'Student added to classroom', classroom });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
