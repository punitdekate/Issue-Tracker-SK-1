import IssueModel from "./issue.schema.js";
import issuePriorityModel from "./master/issuePriority.schema.js";
import issueStatusModel from "./master/issue.status.js";
import issueTypeModel from "./master/issueTypes.schema.js";
import UserProjectIssueRelation from "../user/user.project.issue.Schema.js";

export default class IssueRepository {

    async createIssue(issueData, attachments, userId, projectId) {
        try {
            issueData.assignBy = userId;
            if (issueData.assignTo == "automatic") {
                issueData.assignTo = userId;
            }
            const issue = new IssueModel(issueData);
            attachments.forEach(file => {
                issue.attachments.push(file.filename);
            });
            const createdIssue = await issue.save();
            const userProjectIssueRelation = new UserProjectIssueRelation({
                userId: userId,
                projectId: projectId,
                issueId: createdIssue._id,
            })
            console.log(createdIssue);
            return createdIssue;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    // async getIssue(factor, limit, offset) {
    //     try {
    //         if (!limit || !offset) {
    //             limit = 1;
    //             offset = 1;
    //         }
    //         const skipDocuments = (offset - 1) * limit;
    //         return await IssueModel.find(factor)
    //             .skip(skipDocuments)
    //             .limit(limit)
    //             .populate('assignBy').populate('assignTo').populate('projectId');
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    async getIssue(factor) {
        try {
            return await IssueModel.findOne(factor)
                .populate('assignBy').populate('assignTo').populate('projectId');
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async getAllIssue(factor) {
        try {
            return await IssueModel.find(factor).populate('assignBy').populate('assignTo').populate('projectId');
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async getIssueTypes() {
        try {
            return await issueTypeModel.find()
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async getIssueStatus() {
        try {
            return await issueStatusModel.find()
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async getIssuePriorities() {
        try {
            return await issuePriorityModel.find()
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }



    async searchIssues(query) {
        try {
            await ProjectModel.find({
                $or: [{ summary: { $regex: query, $options: 'i' } },
                    { _id: query }
                ]
            })
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async filterIssues(filters, projectId) {
        try {
            const filter = {}
            if (filters.assignee != '') {
                filter.assignBy = filters.assignee;
            }
            if (filters.type != '') {
                filter.issueType = filters.type;
            }
            if (filters.status != '') {
                filter.status = filters.status;
            }
            if (filters.priority != '') {
                filter.priority = filters.priority;
            }
            filter.projectId = projectId;
            return await IssueModel.find(filter).populate('assignBy').populate('assignTo').populate('projectId');
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async updateSpecificIssue(issueId, issueData, attachments) {
        try {
            const updatedIssue = await IssueModel.findByIdAndUpdate({ _id: issueId }, issueData);
            attachments.forEach(file => {
                updatedIssue.attachments.push(file.filename);
            });
            return await updatedIssue.save();
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async search(query, projectId) {
        try {
            const issues = await IssueModel.find({
                $or: [
                    { summary: { $regex: new RegExp(query, "i") } },
                    { description: { $regex: new RegExp(query, "i") } },
                ],
                projectId: projectId // i for case-insensitive
            }).populate('assignBy').populate('assignTo').populate('projectId');
            return issues;
        } catch (error) {
            throw new Error(error);
        }
    }

}