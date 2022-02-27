const Task = require('../models/task')
const asyncWrapp = require('../middleware/async');
const { createCustomError } = require('../error/custom-error');
// async function getAllTasks(req, res) {
//   try {
//     const tasks = await Task.find({});
//     // res.status(200).json({ tasks, amount:tasks.length });
//     res
//       .status(200)
//       .json({ status: 'success', data: { tasks, nbHits: tasks.length } });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

const getAllTasks = asyncWrapp(async (req, res) => {
  const tasks = await Task.find({});
  res
    .status(200)
    .json({ status: 'success', data: { tasks, nbHits: tasks.length } });
})

const createTask = asyncWrapp(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
})

const getTask = asyncWrapp(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    // v1
    // return res.status(404).json({ msg: `No task with id: ${taskID}` });

    // v2
    // const error = new Error('Not Found');
    // error.status = 404;
    // return next(error);

    // v3
    return next(createCustomError(`No task with id: ${taskID}`, 404));

  };

  res.status(200).json({ task });
})

const deleteTask = asyncWrapp(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });

  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  };

  res.status(200).json({ task });
})



const updateTask = asyncWrapp(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate(
    { _id: taskID },
    req.body,  // data
    {
      new: true, // option
      runValidators: true, // option
    }
  );

  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  };

  res.status(200).json({ task });
})

const editTask = asyncWrapp(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndReplace(
    { _id: taskID },
    req.body,  // data
    {
      new: true, // option
      runValidators: true, // option
    }
  );

  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  };

  res.status(200).json({ task });
})

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
};