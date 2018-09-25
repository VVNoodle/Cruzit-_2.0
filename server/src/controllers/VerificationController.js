const { User } = require("../models/");

module.exports = {
	async post (req, res) {
		try {
			const { secretToken } = req.params;
			const user = await User.findOne({
				where: {
					secretToken
				}
			});
			if (!user) {
				return res.status(400).send({
					error: "Oh no! None of the accounts correspond to given secretToken"
				});
			}
			await user.update({
				secretToken: "",
				active: true
			});
			res.send(user);
		} catch (err) {
			// user already exists
			res.status(404).send({
				error: "An error has occurred when trying to create a bookmark."
			});
		}
	}
};