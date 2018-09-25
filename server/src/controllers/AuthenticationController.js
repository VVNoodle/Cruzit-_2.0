const jwt = require("jsonwebtoken");

const { User } = require("../models/");
const config = require("../config/config");
const mailer = require("../mail/mailer");

function jwtSignUser(user) {
	const ONE_WEEK = 60 * 60 * 24 * 7;
	return jwt.sign(user, config.authentication.jwtSecret, {
		expiresIn: ONE_WEEK
	});
}

module.exports = {
	async register(req, res) {
		try {
			const user = await User.create(req.body);

			const html = `
					Hi there, 
					<br/>
					Thank you for registering to Cruzit! Please verify your email by clicking on the following link: 
					<strong><a href='http://localhost:8080/#/verify/${
	user.secretToken
}'>Verify</a></strong>
					<br/>
					Have a pleasant day!
				`;

			await mailer.sendEmail(
				"cruzit.site@gmail.com",
				"Please Verify Email",
				user.email,
				html
			);

			res.send(user.toJSON());
		} catch (err) {
			// user already exists
			res.status(404).send({
				error: "Email account already in use." + err
			});
		}
	},
	async login(req, res) {
		try {
			const { email, password } = req.body;
			console.log(email + " " + password);
			const user = await User.findOne({
				where: {
					email
				}
			});
			if (!user) {
				res.status(403).send({
					error: "The login information is incorrect. No user found"
				});
			}

			const isPasswordValid = await user.comparePassword(password);
			if (!isPasswordValid) {
				res.status(403).send({
					error: "The login information is incorrect. Password incorrect"
				});
			} else if (!user.active) {
				res.status(403).send({
					error: "You must verify your email!"
				});
			}
			const userJson = user.toJSON();
			res.send({
				user: userJson,
				token: jwtSignUser(userJson)
			});
		} catch (err) {
			res.status(500).send({
				error: "Invalid login information"
			});
		}
	}
};
