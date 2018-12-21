import mongoose from 'mongoose';

const todoSchema = mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    created: { type: Date, default : () => new Date()},
  });
  
  const Todo = module.exports = mongoose.model('todo', todoSchema);