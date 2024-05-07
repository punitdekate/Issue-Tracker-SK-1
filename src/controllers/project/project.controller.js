import ProjectRepository from "../../model/project/project.repository.js";
import IssueRepository from "../../model/issues/issue.repository.js";
import UserRepository from "../../model/user/user.repository.js";
import UserProjectRelationModel from "../../model/user/user.project.schema.js";
export default class ProjectController {
    constructor() {
        this.projectRepository = new ProjectRepository();
        this.issueRepository = new IssueRepository();
        this.userRepository = new UserRepository();
    }
    async showLandingPage(req, res, next) {
        try {
            const userId = req.cookies.user._id;
            const projects = await this.projectRepository.getUserAllProject(userId);
            return res.render('landing-page', { user: req.cookies.user, projects: projects, projectId: null });
        } catch (error) {
            console.log(error);
            return res.render('error-404', { user: null, projectId: null });
        }
    }


    async showMainPage(req, res, next) {
        try {
            const projectId = req.params.projectId;
            const users = await this.userRepository.findAllUser({});
            const types = await this.issueRepository.getIssueTypes();
            const statuses = await this.issueRepository.getIssueStatus();
            const priorities = await this.issueRepository.getIssuePriorities();
            const project = await this.projectRepository.getProject({ _id: projectId })

            const issues = await this.issueRepository.getAllIssue({ projectId: projectId });
            return res.render('main-page', { user: req.cookies.user, issues: issues, project: project, users: users, types: types, statuses: statuses, priorities: priorities, projectId: projectId });
        } catch (error) {
            console.log(error);
            return res.render('error-404', { user: null, projectId: null });
        }
    }
    showNewProject(req, res, next) {
        try {
            return res.render('create-project', { "error": null, user: req.cookies.user, projectId: null });
        } catch (error) {
            console.log(error);
            return res.render('error-404', { user: null, projectId: null });
        }
    }
    async showAssignMember(req, res, next) {
        try {
            const projectId = req.params.projectId;
            const users = await this.userRepository.findAllUser({});
            return res.render('members', { user: req.cookies.user, members: users, projectId: projectId });
        } catch (error) {
            console.log(error);
            return res.render('error-404', { user: null, projectId: null });
        }
    }

    async postAssignMember(req, res, next) {
        try {
            const projectId = req.params.projectId;
            const userId = req.params.userId;
            const isAlreadyAssigned = await this.projectRepository.findUserProject(userId, projectId);
            if (isAlreadyAssigned) {
                return res.status(200).json({ success: true, msg: "User already assigned in project", userId: userId, projectId: projectId });
            }
            const assignProject = new UserProjectRelationModel({
                userId: userId,
                projectId: projectId,
            });
            await assignProject.save();
            return res.status(400).json({ success: false, msg: "User assigned in project successfully", userId: userId, projectId: projectId });
        } catch (error) {
            console.log(error);
            return res.render('error-404', { user: null, projectId: null });
        }
    }
    async createNewProject(req, res, next) {
        try {
            const { name, description, type, duration } = req.body;
            const userId = req.cookies.user._id;
            const isProjectAlready = await this.projectRepository.getProject({ name: name });
            if (isProjectAlready) {
                return res.render('create-project', { "error": { msg: "Project with details already created" }, user: req.cookies.user, projectId: null });
            }
            const response = await this.projectRepository.createProject(name, description, type, duration, userId);
            if (response) {
                return res.redirect('/issue-tracker');
            }
        } catch (error) {
            console.log(error);
            return res.render('error-404', { user: null, projectId: null });
        }
    }

    async getProjectCreatedByUser(userId) {
        try {
            const projects = await this.projectRepository.getUserCreatedProject({ createdBy: userId });
            return projects;
        } catch (error) {
            console.log(error);
            return res.render('error-404', { user: null, projectId: null });
        }
    }


    async filterBySearch(req, res, next) {
        try {
            const { searchQuery } = req.body;
            const projectId = req.params.projectId;
            const issues = await this.issueRepository.search(searchQuery, projectId);
            const users = await this.userRepository.findAllUser({});
            const types = await this.issueRepository.getIssueTypes();
            const statuses = await this.issueRepository.getIssueStatus();
            const priorities = await this.issueRepository.getIssuePriorities();
            const project = await this.projectRepository.getProject({ _id: projectId })

            return res.render('main-page', { user: req.cookies.user, issues: issues, project: project, users: users, types: types, statuses: statuses, priorities: priorities, projectId: projectId });
        } catch (error) {
            console.log(error);
            return res.render('error-404', { user: null, projectId: null });
        }

    }

    async filter(req, res, next) {
        try {
            const filters = req.body;
            console.log(filters);
            const projectId = req.params.projectId;
            const issues = await this.issueRepository.filterIssues(filters, projectId);
            const users = await this.userRepository.findAllUser({});
            const types = await this.issueRepository.getIssueTypes();
            const statuses = await this.issueRepository.getIssueStatus();
            const priorities = await this.issueRepository.getIssuePriorities();
            const project = await this.projectRepository.getProject({ _id: projectId })

            res.render('main-page', { user: req.cookies.user, issues: issues, project: project, users: users, types: types, statuses: statuses, priorities: priorities, projectId: projectId });
        } catch (error) {
            console.log(error);
            return res.render('error-404', { user: null, projectId: null });
        }
    }
}