const { Upvote, Project } = require("../models/");
const _ = require("lodash");

module.exports = {
	async index(req, res) {
		try {
			const { projectId } = req.query;
			let where = {
				UserId: req.user.id
			};
			if (projectId) {
				where.ProjectId = projectId;
			}
			console.log("WHERE: ", where);
			const upvote = await Upvote.findAll({
				where,
				include: [
					{
						model: Project
					}
				]
			})
				.map(upvote => upvote.toJSON())
				.map(upvote => _.extend({}, upvote.Project, upvote));
			console.log("FINAL BOOKMARK: ", upvote);
			res.send(upvote);
		} catch (err) {
			// user already exists
			res.status(404).send({
				error: "An error has occurred when trying to fetch the upvotes."
			});
		}
	},
	async post(req, res) {
		try {
			const { projectId } = req.body;
			const upvote = await Upvote.findOne({
				where: {
					UserId: req.user.id,
					ProjectId: projectId
				}
			});
			let newUpvote;
			if (!upvote) {
				newUpvote = await Upvote.create({
					ProjectId: projectId,
					UserId: req.user.id
				});
				Project.findById(projectId).then(project => {
					return project.increment(["likes"], { by: 1 });
				});
			} else {
				newUpvote = await Upvote.destroy({
					where: {
						id: upvote.id
					}
				});
				Project.findById(projectId).then(project => {
					return project.decrement("likes", { by: 1 });
				});
			}

			res.send(newUpvote);
		} catch (err) {
			// user already exists
			res.status(404).send({
				error: "An error has occurred when trying to create a upvote."
			});
		}
	}
	// async delete(req, res) {
	// 	try {
	// 		const { bookmarkId } = req.params;
	// 		const bookmark = await Bookmark.findOne({
	// 			where: {
	// 				id: bookmarkId,
	// 				UserId: req.user.id
	// 			}
	// 		});
	// 		console.log("bookmarkid: " + bookmarkId);
	// 		console.log("todelete:", bookmark);
	// 		if (!bookmark) {
	// 			res.status(403).send({
	// 				error: "You don't have access to this bookmark"
	// 			});
	// 		}
	// 		await bookmark.destroy();
	// 		res.send(bookmark);
	// 	} catch (err) {
	// 		// user already exists
	// 		console.log(err);
	// 		res.status(404).send({
	// 			error: "An error has occurred when trying to delete the bookmark."
	// 		});
	// 	}
	// }
};
