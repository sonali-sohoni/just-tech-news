const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");
//create our user user model
class User extends Model {
  checkPassword(pw) {
    return bcrypt.compareSync(pw,this.password)
  }
}

//define table columns
User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [4],
			},
		},
	},
	{
		hooks: {
			// set up beforeCreate lifecycle "hook" functionality
			async beforeCreate(newUserData) {
				console.log(newUserData);
				newUserData.password = await bcrypt.hash(newUserData.password, 10);
				console.log(newUserData);
				return newUserData;
			},
			async beforeUpdate(updatedUserData) {
				updatedUserData.password = await bcrypt.hash(
					updatedUserData.password,
					10
				);
				return updatedUserData;
			},
		},

		//Table configurations
		sequelize,
		timestamps: false,
		imderscpred: true,
		freezeTableName: true,
		modelName: "user",
	}
);
module.exports = User;
