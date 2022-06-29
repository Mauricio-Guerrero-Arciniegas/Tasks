// Models
const { Task } = require('../models/tasks.model');
// Utils
const { catchAsync } = require('../utils/catchAsync.util');


const getAllTasks = catchAsync(async (req, res, next) => {
	const tasks = await Task.findAll();

	res.status(200).json({
		status: 'success',
		tasks,
	});
});


const createTask = catchAsync(async (req, res, next) => {
	const { title, limitDate, userId } = req.body;

	const newTask = await Task.create({
		title,
		userId,
		limitDate,
	});

	res.status(201).json({
		status: 'success',
		newTask,
	});
});

const getTaskByStatus = catchAsync(async (req, res, next) => {
	const { status } = req.params;

	const task = await Task.findOne({ where: { status } });

	if (!task) {
		return res.status(404).json({
			status: 'error',
			message: 'Task not found',
		});
	}

	res.status(200).json({
		status: 'success',
		task,
	});
});

const updateTask = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const { time } = req.body;

	const task = await Task.findOne({ where: { id } });

	if (!task || task.status !== 'active') {
		return res.status(404).json({
			status: 'error',
			message: 'Task not found',
		});
	}
	const postDate = new Date(time);
	const taskDate = new Date(task.limitDate);
	let taskStatus
	if (postDate > taskDate){
		taskStatus = 'late';
	} else {
		taskStatus = 'completed';
	}
	await task.update({ time, status:taskStatus });

	res.status(204).json({ status: 'success' });
});

const deleteTask = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const task = await Task.findOne({ where: { id } });

	if (!task) {
		return res.status(404).json({
			status: 'error',
			message: 'Task not found',
		});
	}

	await task.update({ status: 'cancelled' });

	res.status(204).json({ status: 'success' });
});

module.exports = {
	getAllTasks,
	createTask,
	getTaskByStatus,
	updateTask,
	deleteTask,
};