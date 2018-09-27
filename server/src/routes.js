const AuthenticationController = require("./controllers/AuthenticationController");
const AuthenticationControllerPolicy = require("./policies/AuthenticationControllerPolicy");
const BookmarksController = require("./controllers/BookmarksController");
const UpvotesController = require("./controllers/UpvotesController");
const ProjectsController = require("./controllers/ProjectsController");
const HistoryController = require("./controllers/HistoryController");
const UsersController = require("./controllers/UsersController");
const VerificationController = require("./controllers/VerificationController");

const isAuthenticated = require("./policies/IsAuthenticated");

module.exports = function(app) {
	app.post(
		"/register",
		AuthenticationControllerPolicy.register,
		AuthenticationController.register
	);
	app.post("/login", AuthenticationController.login);

	app.get("/projects", ProjectsController.index);
	app.post("/projects", isAuthenticated, ProjectsController.post);
	app.get("/projects/:projectId", ProjectsController.show);
	app.put("/projects/:projectId", isAuthenticated, ProjectsController.edit);
	app.delete(
		"/projects/:projectId",
		isAuthenticated,
		ProjectsController.delete
	);

	app.get("/bookmarks", isAuthenticated, BookmarksController.index);
	app.post("/bookmarks", isAuthenticated, BookmarksController.post);
	app.delete(
		"/bookmarks/:bookmarkId",
		isAuthenticated,
		BookmarksController.delete
	);

	app.get("/upvotes", isAuthenticated, UpvotesController.index);
	app.post("/upvotes", isAuthenticated, UpvotesController.post);

	app.get("/history", isAuthenticated, HistoryController.index);
	app.post("/history", isAuthenticated, HistoryController.post);

	app.post("/addowner", UsersController.add);

	app.post("/verify/:secretToken", VerificationController.post);
};
