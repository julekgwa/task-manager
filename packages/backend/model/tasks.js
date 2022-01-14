const mongoose = require('mongoose');

const Tasks = mongoose.model('Tasks', new mongoose.Schema({
  userId: {
    type: String,
  },
  rootId: {
      type: String,
      required: false,
  },
  title: {
      type: String,
      required: true,
      unique: true
  },
  status: {
      type: Boolean,
      required: false,
      default: false
  },
  tasks: {
    type: [this.Tasks],
    required: false
  },
  dueDate: {
    type: String,
    required: true
  }
}));

module.exports = {
  Tasks
}