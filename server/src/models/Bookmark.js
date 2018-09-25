module.exports = function (sequelize) {
	let Bookmark = sequelize.define("Bookmark", {});

	Bookmark.associate = function (models) {
		Bookmark.belongsTo(models.User);
		Bookmark.belongsTo(models.Project);
	};

	return Bookmark;
};