import express from "express";
import { auth } from "../../../middlewares/auth.js";
import ProjectController from "../../controllers/project/project.controller.js";
import { validateProject } from "../../../middlewares/project.validator.middleware.js";
const projectRouter = express.Router();

const projectController = new ProjectController();



projectRouter.get("/create", (req, res, next) => {
    projectController.showNewProject(req, res, next);
});

projectRouter.post("/create", validateProject, (req, res, next) => {
    projectController.createNewProject(req, res, next);
});
projectRouter.post("/:projectId/search", (req, res, next) => {
    projectController.filterBySearch(req, res, next);
});

projectRouter.post("/:projectId/filter", (req, res, next) => {
    projectController.filter(req, res, next);
});

projectRouter.post('/:projectId/assignMember/:userId', (req, res, next) => {
    projectController.postAssignMember(req, res, next);
});

projectRouter.get('/:projectId/assignMember', (req, res, next) => {
    projectController.showAssignMember(req, res, next);
});

projectRouter.get('/:projectId', (req, res, next) => {
    projectController.showMainPage(req, res, next);
});






projectRouter.get("/", auth, (req, res, next) => {
    projectController.showLandingPage(req, res, next);
});







//Issue tracker page
projectRouter.get('/', (req, res, next) => {
    projectController.showLandingPage(req, res, next);
})


export default projectRouter;