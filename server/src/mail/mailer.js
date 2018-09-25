const nodemailer = require("nodemailer");
const config = require("../config/config");
const Promise = require("bluebird");

var transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: config.GOOGLE_USER,
		pass: config.GOOGLE_PASSWORD
	},
	tls: {
		rejectUnauthorized: false
	}
});

module.exports = {
	sendEmail(author, subject, to, html) {
		return new Promise((resolve, reject) => {
			transporter.sendMail(
				{
					from: author,
					subject,
					to,
					html
				},
				(err, info) => {
					if (err) {
						reject(err);
					}
					resolve(info);
				}
			);
		});
	}
};
