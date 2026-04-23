const { Queue } = require('bullmq');
const redis = require('../src/config/redis');

const taskQueue = new Queue('taskQueue', {
  connection: redis
});

module.exports = taskQueue;