import express from "express";
import IssueController from "../../controllers/issues/issue.controller.js";
import { upload } from "../../../middlewares/upload.middleware.js";
const issueRouter = express.Router();

const issueController = new IssueController();


issueRouter.post("/view/:projectId/:issueId", upload.array('attachments'), (req, res, next) => {
    issueController.updateIssue(req, res, next);
});

issueRouter.get("/view/:projectId/:issueId", upload.array('attachments'), (req, res, next) => {
    issueController.showUpdateIssue(req, res, next);
});

issueRouter.get("/:projectId", (req, res, next) => {
    issueController.showIssue(req, res, next);
});

issueRouter.post("/:projectId", upload.array('attachments'), (req, res, next) => {
    issueController.createNewIssue(req, res, next);
});

export default issueRouter;