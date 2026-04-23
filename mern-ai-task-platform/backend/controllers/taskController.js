const taskService = require('../services/taskService');

exports.createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body, req.user);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.runTask = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id, req.user);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    if (task.status === 'running') {
      return res.status(400).json({ msg: 'Task already running' });
    }

    if (task.status === 'success') {
      return res.status(400).json({ msg: 'Task already completed' });
    }

    // mark as pending explicitly
    task.status = 'pending';
    await task.save();

    await taskService.enqueueTask(task);

    res.json({ msg: 'Task queued' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getUserTasks(req.user);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id, req.user);
    if (!task) return res.status(404).json({ msg: 'Not found' });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};