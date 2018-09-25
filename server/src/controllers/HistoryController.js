const { History, Project } = require("../models/");
const _ = require("lodash");

module.exports = {
	async index(req, res) {
		try {
			const history = await History.findAll({
				where: {
					UserId: req.user.id
				},
				include: [
					{
						model: Project
					}
				],
				group: ["History.id","Project.id"],
			})
				.map(history => history.toJSON())
				.map(history => _.extend({}, history.Project, history));
			res.send(_.uniqBy(history, history => history.ProjectId));
		} catch (err) {
			// user already exists
			res.status(404).send({
				error: "An error has occurred when trying to fetch the history." + err
			});
		}
	},
	async post(req, res) {
		try {
			const { projectId } = req.body;
			console.log("testnow:", req.user.id);
			console.log("projectId:",projectId);
			// let history = await History.findOne({
			// 	ProjectId: projectId,
			// 	UserId: req.user.id
			// });
			// if (history) {
			// 	history.destroy();
			// } 
			let history = await History.create({
				ProjectId: projectId,
				UserId: req.user.id
			});
			console.log("this.history:", history);
			res.send(history);
		} catch (err) {
			// user already exists
			console.log("ERRORRR",err);
			res.status(404).send({
				error: "An error has occurred when trying to create the history object."
			});
		}
	}
};