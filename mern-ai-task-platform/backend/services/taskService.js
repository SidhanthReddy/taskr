const Task = require('../models/Task');
const taskQueue = require('../queue/taskQueue');
const redis = require('../src/config/redis');

exports.createTask = async (data, userId) => {
  return await Task.create({
    ...data,
    userId,
    status: 'pending'
  });
};

exports.enqueueTask = async (task) => {
  console.log("Pushing job to Redis...");
  await redis.lpush('taskQueue', JSON.stringify({
    taskId: task._id,
    input: task.input,
    operation: task.operation
  }));
  console.log("Job pushed");
};

exports.getUserTasks = async (userId) => {
  return await Task.find({ userId }).sort({ createdAt: -1 });
};

exports.getTaskById = async (id, userId) => {
  return await Task.findOne({ _id: id, userId });
};