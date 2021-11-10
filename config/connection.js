const Sequelize = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(
	process.env.DB_Name,
	process.env.DB_USER,
	process.env.DB_PW,
	{
		host: "localhost",
		dialect: "mysql",
		port: 3310,
	}
);
module.exports = sequelize;
