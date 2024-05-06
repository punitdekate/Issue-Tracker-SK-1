import IssueRepository from "../../model/issues/issue.repository.js";
import ProjectRepository from "../../model/project/project.repository.js";
import UserRepository from "../../model/user/user.repository.js";
export default class IssueController {
    constructor() {
        this.issueRepository = new IssueRepository();
        this.projectRepository = new ProjectRepository();
        this.userRepository = new UserRepository();
    }

    async showIssue(req, res, next) {
        const projectId = req.params.projectId;
        const project = await this.projectRepository.getProject({ _id: projectId });
        const users = await this.userRepository.getUserSpecificProject(projectId);
        const types = await this.issueRepository.getIssueTypes();
        const statuses = await this.issueRepository.getIssueStatus();
        const priorities = await this.issueRepository.getIssuePriorities();
        return res.render('create-issue', { error: null, user: req.cookies.user, project: project, users: users, types: types, statuses: statuses, priorities: priorities, projectId: projectId });
    }

    async createNewIssue(req, res, next) {
        const issueData = req.body;
        const attachments = req.files;
        const projectId = req.params.projectId;
        const userId = req.cookies.user._id;
        try {
            const issue = await this.issueRepository.createIssue(issueData, attachments, userId, projectId);
            return res.redirect(`/issue-tracker/${projectId}`);
        } catch (error) {
            console.log(error);
            return res.render('error-404', { user: null, projectId: null });
        }
    }

    async showUpdateIssue(req, res, next) {
        try {
            const issueId = req.params.issueId;
            const projectId = req.params.projectId;
            const issue = await this.issueRepository.getIssue({ _id: issueId });
            const project = await this.projectRepository.getProject({ _id: projectId });
            const users = await this.userRepository.getUserSpecificProject(projectId);
            const types = await this.issueRepository.getIssueTypes();
            const statuses = await this.issueRepository.getIssueStatus();
            const priorities = await this.issueRepository.getIssuePriorities();
            return res.render('update-issue', { error: null, user: req.cookies.user, project: project, users: users, types: types, statuses: statuses, priorities: priorities, projectId: projectId, issue: issue });
        } catch (error) {
            console.log(error);
            return res.render('error-404', { user: null, projectId: null });
        }

    }
    async updateIssue(req, res, next) {
        try {
            const data = req.body;
            const issueId = req.params.issueId;
            const projectId = req.params.projectId;
            const attachments = req.files;
            const updatedIssue = await this.issueRepository.updateSpecificIssue(issueId, data, attachments);
            return res.redirect(`/issue-tracker/${projectId}`);
        } catch (error) {
            console.log(error);
            return res.render('error-404', { user: null, projectId: null });
        }

    }

}