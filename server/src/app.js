const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const {sequelize} = require("./models");
const config = require("./config/config.json");
// const randomstring = require("randomstring");

const app = express();

app.use(bodyParser.json());
app.use(cors()); //for any clients to be able to access this server
app.use(morgan("combined"));

require("./passport");
require("./routes")(app);

sequelize
	.sync()
	.then(() => {
		app.listen(config.port, () => {
			console.log(`Listening to port ${config.port}`);
		});
	});