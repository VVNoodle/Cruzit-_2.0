const Promise = require("bluebird");

// password hashing function
const bcrypt = Promise.promisifyAll(require("bcrypt-nodejs"));

// generates a random string
const randomstring = require("randomstring");

module.exports = function(sequelize, DataTypes) {
	const User = sequelize.define(
		"User",
		{
			username: {
				type: DataTypes.STRING,
				unique: true
			},
			email: {
				type: DataTypes.STRING,
				unique: true
			},
			password: {
				type: DataTypes.STRING
			},
			affiliation: {
				type: DataTypes.ENUM,
				values: [
					"Cowell",
					"Stevenson",
					"Crown",
					"Merill",
					"9",
					"10",
					"Kresge",
					"Porter",
					"Rachel Carson",
					"Oakes"
				]
			},
			achievements: {
				type: DataTypes.ENUM,
				values: ["Just Started", "One Year", "Two Years"]
			},
			secretToken: {
				type: DataTypes.STRING,
				defaultValue: randomstring.generate()
			},
			active: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			}
		},
		{
			hooks: {
				beforeCreate: hashPassword
			}
		}
	);

	User.prototype.comparePassword = function(password) {
		return bcrypt.compareAsync(password, this.password);
	};

	User.associate = function(models) {
		User.belongsToMany(models.Project, { through: "ProjectOwner" });
		User.hasMany(models.Comment);
	};

	return User;
};

// hashes the password, then assign it to the password property of the user
function hashPassword(user) {
	const SALT_FACTOR = 8;

	/* 
		user.changed() = return a boolean indicating whether the value of that key
		in dataValues is different from the value in _previousDataValues
	*/

	if (!user.changed()) {
		return;
	}
	return bcrypt
		.genSaltAsync(SALT_FACTOR)
		.then(salt => {
			return bcrypt.hashAsync(user.password, salt, null);
		})
		.then(hash => {
			return user.setDataValue("password", hash);
		});
}
