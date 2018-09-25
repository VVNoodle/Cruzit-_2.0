const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
// const env = process.env.NODE_ENV || "development";
// const config = require("../config/config.json")[env];
const db = {};

const sequelize = new Sequelize("cruzit", "cruzit", "cruzit", {
	dialect: "postgres",
});

fs.
	readdirSync(__dirname)
	.filter((file) => {
		return file !== "index.js";
	})
	.forEach((file) => {
		const model = sequelize.import(path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach(function(modelName) {
	if ("associate" in db[modelName]){
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;