// object schema validation
const joi = require("joi");

module.exports = {
	register(req, res, next) {
		// set up schema validation
		const schema = {
			email: joi.string().regex(new RegExp(".+@ucsc.edu")),
			username: joi
				.string()
				.alphanum()
				.min(3)
				.max(15)
				.required(),
			password: joi.string().regex(new RegExp("^[a-zA-Z0-9]{8,32}$")),
			affiliation: joi.string()
		};

		// validates registration info with schema
		const { error } = joi.validate(req.body, schema);

		if (error) {
			switch (error.details[0].context.key) {
			case "email":
				res.status(400).send({
					error: "You must provide a valid UCSC email address"
				});
				break;
			case "password":
				res.status(400).send({
					error:
							"Password must be 8-32 characters long and be lower/upper case letters or numbers"
				});
				break;
			case "username":
				res.status(400).send({
					error:
							"username must be included alphanumerical, minimum length 3, and maximum length 15"
				});
				break;
			default:
				res.status(400).send({
					error: `Invalid registration information, ${
						error.details[0].context.key
					}`
				});
			}
		} else {
			// if registration is valid (no error), then register
			next();
		}
	}
};
