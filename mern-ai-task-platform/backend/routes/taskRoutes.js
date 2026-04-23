const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const {
  createTask,
  runTask,
  getTasks,
  getTask
} = require('../controllers/taskController');
const validate = require('../middleware/validate');
const { createTaskSchema } = require('../validators/taskValidator');

router.post('/', auth, createTask);
router.get('/', auth, getTasks);
router.get('/:id', auth, getTask);
router.post('/:id/run', auth, runTask);
router.post('/', auth, validate(createTaskSchema), createTask);

module.exports = router;