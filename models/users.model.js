const { db, DataTypes } = require('../utils/database.util');
// Create our first model (table)
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const User = db.define(process.env.DB_MODEL_USER_TABLE, {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: process.env.DEFAULT_USER_STATUS,
	},
});

module.exports = { User };