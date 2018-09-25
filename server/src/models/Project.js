module.exports = function(sequelize, DataTypes) {
	let Project = sequelize.define("Project", {
		title: {
			type: DataTypes.STRING,
			unique: true
		},
		description: {
			type: DataTypes.TEXT
		},
		medium: {
			type: DataTypes.ARRAY(DataTypes.STRING)
		},
		owners: {
			type: DataTypes.ARRAY(DataTypes.STRING)
		},
		uploaderId: {
			type: DataTypes.INTEGER
		},
		creativeFields: {
			type: DataTypes.ARRAY(DataTypes.STRING)
		},
		likes: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		type: {
			type: DataTypes.ENUM,
			values: ["image", "audio", "video"]
		},
		links: {
			type: DataTypes.ARRAY(DataTypes.JSON(1000)),
			defaultValue: []
		}
	});

	Project.associate = function(models) {
		Project.belongsToMany(models.User, { through: "ProjectOwner" });
		Project.hasMany(models.Comment);
	};

	return Project;
};
