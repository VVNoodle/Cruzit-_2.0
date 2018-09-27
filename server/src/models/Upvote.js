module.exports = function(sequelize) {
	let Upvote = sequelize.define("Upvote", {});

	Upvote.associate = function(models) {
		Upvote.belongsTo(models.User);
		Upvote.belongsTo(models.Project);
	};

	return Upvote;
};
