const { app } = require('./app');
// Models
const { User } = require('./models/users.model');
const { Task } = require('./models/tasks.model');
// Utils
const { db } = require('./utils/database.util');

db.authenticate()
	.then(() => console.log('Db authenticated'))
	.catch(err => console.log(err));

// Establish model's relations
// 1 User <----> M Tasks
User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User);

db.sync()
	.then(() => console.log('Db synced'))
	.catch(err => console.log(err));

app.listen(4000, () => {
	console.log('Express app running!!');
});