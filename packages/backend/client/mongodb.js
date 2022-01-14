const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const HttpStatus = require('http-status-codes');

const { Tasks } = require('../model/tasks');
const { User } = require('../model/user');

async function registration(payload) {
  // Check if this user already exisits
  let user = await User.findOne({ email: payload.email });
  if (user) {
    throw new Error('User already exists!');
  }
  // Insert the new user if they do not exist yet
  user = new User({
    name: payload.name,
    email: payload.email,
    password: payload.password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  return { result: { login: true, id: user._id.toString(), name: user.name }, status: HttpStatus.OK };
}

async function getAllTasks(userId) {
  return {
    result: await Tasks.find({
      userId: userId
    }),
    status: HttpStatus.OK,
  };
}

async function addTask({ title, dueDate, status = false, tasks, rootId, userId }) {
  const task = new Tasks({
    title,
    dueDate,
    status,
    tasks,
    rootId,
    userId
  });

  await task.save();
  return {
    ...await getAllTasks(userId),
    status: HttpStatus.OK,
  };
}

async function addSubTask({ title, dueDate, userId, id, status = false, tasks = [] }) {
  const task = new Tasks({
    title,
    dueDate,
    status,
    tasks,
    rootId: id,
  });

  await Tasks.findOneAndUpdate(
    { _id: ObjectId(id), userId: userId },
    { $push: { tasks: task } }
  );

  return {
    ...await getAllTasks(userId),
    status: HttpStatus.OK,
  };
}

async function getTask(id, userId) {
  const rootTask = await Tasks.findOne({ _id: ObjectId(id), userId: userId });

  if (rootTask) {
    return {
      result: rootTask,
      status: HttpStatus.OK,
    };
  }
  const task = await Tasks.findOne({
    tasks: { $elemMatch: { _id: ObjectId(id), userId: userId } },
  });

  return {
    result: task,
    status: HttpStatus.OK,
  };
}

async function deleteTask(id, userId) {
  const task = await Tasks.findOne({ _id: ObjectId(id), userId: userId });

  if (task) {
    await Tasks.remove({ _id: ObjectId(id) })
    return {
      ...await getAllTasks(userId),
      status: HttpStatus.OK,
    };
  }

  const findTask = await getTask(id);
  const toRemove = findTask.result.tasks.filter((item) =>
    item._id.toString().includes(id)
  )?.[0];

  await Tasks.findOneAndUpdate(
    { _id: ObjectId(toRemove.rootId), userId: userId },
    { $pull: { tasks: { _id: ObjectId(id) } } }
  );

  return {
    ...await getAllTasks(userId),
    status: HttpStatus.OK,
  };
}

async function updateTask({ id, title, status, dueDate, userId, tasks }) {
  const task = await Tasks.findOne({ _id: ObjectId(id) });

  if (task) {
    await Tasks.updateOne(
      {
        _id: ObjectId(id),
        userId: userId
      },
      { $set: { title, status, dueDate, tasks } }
    );
    return {
      ...await getAllTasks(userId),
      status: HttpStatus.OK,
    };
  }

  await Tasks.updateOne(
    { 'tasks._id': ObjectId(id) },
    {
      $set: {
        'tasks.$.title': title,
        'tasks.$.status': status,
        'tasks.$.dueDate': dueDate,
        'tasks.$.tasks': tasks,
      },
    }
  );

  return {
    ...await getAllTasks(userId),
    status: HttpStatus.OK,
  };
}

async function login(payload) {
  let user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new Error('Incorrect email or password.');
  }

  const validPassword = await bcrypt.compare(payload.password, user.password);
  if (!validPassword) {
    throw new Error('Incorrect email or password.');
  }

  return {
    result: { login: true, id: user._id.toString(), name: user.name },
    status: HttpStatus.OK,
  };
}

module.exports = {
  registration,
  login,
  addTask,
  addSubTask,
  getTask,
  deleteTask,
  getAllTasks,
  updateTask,
};
