// Models
const { User } = require('../models/users.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const getAllUsers = catchAsync(async (req, res, next) => {
	const users = await User.findAll();

	res.status(200).json({
		status: 'success',
		users,
	});
});

const createUser = catchAsync(async (req, res, next) => {
	const { name, email, password } = req.body;

	const newUser = await User.create({
		name,
		email,
		password,
	});

	res.status(201).json({
		status: 'success',
		newUser,
	});
});

const getUserById = catchAsync(async (req, res, next) => {
	const { user } = req;

	res.status(200).json({
		status: 'success',
		user,
	});
});

const updateUser = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const { name, email } = req.body;

	const user = await User.findOne({ where: { id } });

	await user.update({ name, email });

	res.status(204).json({ status: 'success' });
});

const deleteUser = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const user = await User.findOne({ where: { id } });

	await user.update({ status: 'cancelled' });

	res.status(204).json({ status: 'cancelled' });
});

module.exports = {
	getAllUsers,
	createUser,
	getUserById,
	updateUser,
	deleteUser,
};