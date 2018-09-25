const { User, Project } = require("../models/");

module.exports = {
	async add(req, res) {
		try {
			const projectId = req.body[0];
			const username = req.body[1];
			if (username) {
				const user = await User.findOne({
					where: {
						username
					}
				});
				const project = await Project.findById(projectId);
				console.log("userz", user);
				console.log("projectz", project);
				await user.addProjects(project);
				res.send("OK");				
			} else {
				res.send("NOK");
			}
		} catch (err) {
			res.status(404).send({
				error: "An error has occurred when trying to fetch the user. " + err
			});
		}
	}
};