import UserProjectRelationModel from "../user/user.project.schema.js";
import ProjectModel from "./project.schema.js";
export default class ProjectRepository {

    async getProject(factor) {
        try {
            return await ProjectModel.findOne(factor);
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async createProject(name, description, type, duration, userId) {
        try {
            const project = new ProjectModel({
                name: name,
                description: description,
                type: type,
                duration: duration,
                createdBy: userId,
            });
            const projectCreated = await project.save();
            const userProjectRelation = new UserProjectRelationModel({
                userId: userId,
                projectId: projectCreated._id
            });
            await userProjectRelation.save();
            return projectCreated;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUserAssignedProjects(userId, limit = 0, offset = 0) {
        try {
            if (!limit || !offset) {
                console.log(userId);
                const userAssignedProjects = await ProjectModel.find({
                    $or: [
                        { createdBy: userId },
                        { members: { $in: [userId] } }
                    ]
                }).sort({ createdOnDate: -1 })
                const totalCount = await ProjectModel.countDocuments();
                return { success: true, projects: userAssignedProjects, totalCount: totalCount }
            }
            let skip = (limit * offset)
            const userAssignedProjects = await ProjectModel.find({
                    $or: [
                        { createdBy: userId },
                        { members: { $in: [userId] } }
                    ]
                }).sort({ createdOnDate: -1 })
                .skip(skip)
                .limit(limit);
            const totalCount = await ProjectModel.countDocuments();
            return { success: true, projects: userAssignedProjects, totalCount: totalCount };
        } catch (error) {
            throw new Error(error);
            throw new Error(error);
        }
    }

    async findUserProject(userId, projectId) {
        try {
            return await UserProjectRelationModel.findOne({ userId: userId, projectId: projectId });
        } catch (error) {
            throw new Error(error);
            throw new Error(error);
        }
    }

    async getUserAllProject(userId) {
        try {
            return await UserProjectRelationModel.find({ userId: userId }).populate('projectId')
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

}