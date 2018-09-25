module.exports = function (sequelize) {
	let History = sequelize.define("History", {});

	History.associate = function (models) {
		History.belongsTo(models.User);
		History.belongsTo(models.Project);
	};

	return History;
};