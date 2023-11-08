require('dotenv').config();
const config = {
	db: {
		host: 'localhost',
		user: `${process.env.user}`,
		password: `${process.env.password}`,
		database: `${process.env.database}`
	}
};
module.exports = config;
