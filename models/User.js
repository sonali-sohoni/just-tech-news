const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//create our user user model
class User extends Model {}

//define table columns
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
        isEmail: true
        
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len:[4]
        }
      }

    }
	},
	{
		//Table configurations
		sequelize,
		timestamps: false,
		imderscpred: true,
		freezeTableName: true,
		modelName: "user",
	}
);
module.exports = User;
