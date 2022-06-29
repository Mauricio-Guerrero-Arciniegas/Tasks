// Model's attributes: id, title, content, userId, status
const { db, DataTypes } = require('../utils/database.util');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const Task = db.define(process.env.DB_MODEL_TASKS_TABLE, {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	userId: {
		type: DataTypes.INTEGER,
		references: {
			model: process.env.DB_MODEL_USER_TABLE, // 'fathers' refers to table name
			key: 'id', // 'id' refers to column name in fathers table
		},
		allowNull: false,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	limitDate: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	startDate: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: new Date()
	},
	finishDate: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

module.exports = { Task };