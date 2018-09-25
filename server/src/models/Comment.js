module.exports = function (sequelize, DataTypes) {
	let Comment = sequelize.define("Comment", {
		content: {
			type: DataTypes.TEXT,
			required: true
		},
		uploader: {
			type: DataTypes.STRING,
			required: true
		},
		uploaderId: {
			type: DataTypes.INTEGER
		},
		likes: {
			type: DataTypes.INTEGER
		}
	});

	Comment.associate = function (models) {
		Comment.belongsTo(models.User);
		Comment.belongsTo(models.Project);
	};


	return Comment;
};