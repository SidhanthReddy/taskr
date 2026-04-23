const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    index: true
  },

  title: { type: String, required: true },

  input: { type: String, required: true },

  operation: { 
    type: String, 
    enum: ['uppercase', 'lowercase', 'reverse', 'wordcount'],
    required: true
  },

  status: {
    type: String,
    enum: ['pending', 'running', 'success', 'failed'],
    default: 'pending',
    index: true
  },

  result: { type: String },
  logs: [
    {
      message: String,
      timestamp: { type: Date, default: Date.now }
    }
  ],
  retryCount: { type: Number, default: 0 }
}, { timestamps: true });

// extra index for sorting/filtering
taskSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Task', taskSchema);