// const {sequelize,Project,User,Bookmark,History} = require("../src/models");
const { sequelize, User, Project } = require("../src/models");

const Promise = require("bluebird");
const projects = require("./projects.json");
const users = require("./users.json");
// const bookmarks = require("./bookmarks.json");
// const histories = require("./history.json");

sequelize.sync({ force: true }).then(async function() {
	await Promise.all(
		users.map(user => {
			User.create(user);
		})
	);

	await Promise.all(
		projects.map(projects => {
			Project.create(projects);
		})
	);

	// await Promise.all(
	// 	bookmarks.map(bookmark => {
	// 		Bookmark.create(bookmark);
	// 	})
	// );

	// await Promise.all(
	// 	histories.map(history => {
	// 		History.create(history);
	// 	})
	// );

	await User.findOne({
		username: "Brick"
	}).then(user => {
		Project.findAll()
			.then(projects => {
				Promise.all(
					projects.map(project => {
						user.addProjects(project);
					})
				);
			})
			.catch(err => {
				console.log("heres the error");
				console.log(err);
			});
	});
});
