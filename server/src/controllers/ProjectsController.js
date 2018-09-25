const {Project, User} = require("../models/");

module.exports = {
	async post(req, res) {
		try {
			(async () => {
				const project = await Project.create(req.body);
				res.send(project);
			})();
		} catch (err) {
			res.status(500).send({
				error: "an error has occured trying to create the project"
			});
		}
	},
	async index (req, res) {
		try {
			let projects = null;
			let search = req.query.search;
			if(search){
				projects = await Project.findAll({
					where: {
						$or: [{
							"title": {
								$ilike: `%${search}%`
							}
						}]
					}
				});
				if(!projects.length){
					projects = await Project.findAll({
						include: [{
							model: User,
							where: {
								username: {
									$ilike: `%${search}%`
								}
							}
						}]
					});
				}
			} else{
				projects = await Project.findAll({
					limit: 10
				});
			}
			res.send(projects);
		} catch (err) {
			// user already exists
			res.status(404).send({
				error: "An error has occurred when trying to fetch the projects. "+err
			});
		}
	},
	async show(req, res) {
		try {
			const projects = await Project.findById(req.params.projectId);
			res.send(projects);
		} catch (err) {
			// user already exists
			res.status(404).send({
				error: "An error has occurred when trying to fetch the project."
			});
		}
	},
	async edit(req, res) {
		try {
			await Project.update(req.body, {
				where: {
					id: req.body.id
				}
			});
			res.send(req.body);
		} catch (err) {
			// user already exists
			res.status(404).send({
				error: "An error has occurred when trying to edit the project."
			});
		}
	},
	async delete(req, res) {
		try {
			await Project.destroy({
				where: {
					id: req.params.projectId
				}
			});
			res.send({
				status: "done"
			});
		} catch (err) {
			// user already exists
			res.status(404).send({
				error: "An error has occurred when trying to delete the project."
			});
		}
	}
};