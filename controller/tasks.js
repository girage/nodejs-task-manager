const Task = require('../models/task')

async function getAllTasks(req, res) {
  try {
    const tasks = await Task.find({});
    // res.status(200).json({ tasks, amount:tasks.length });
    res
      .status(200)
      .json({ status: 'success', data: { tasks, nbHits: tasks.length } });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

async function createTask(req, res) {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

async function getTask(req, res) {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    // const task = await Task.findOne({ id: req.params.id }).exec();;
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });

    };

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

async function deleteTask(req, res) {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });

    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    };

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

async function updateTask(req, res) {
  try {
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
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    };

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

async function editTask(req, res) {
  try {
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
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    };

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
}


module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
};