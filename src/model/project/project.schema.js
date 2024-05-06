import mongoose from 'mongoose';
import UserProjectRelationModel from '../user/user.project.schema.js';
import UserProjectIssueRelation from '../user/user.project.issue.Schema.js';

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Project name is required"],
        unique: [true, "Project name should be unique"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    organization: {
        type: String
    },
    type: {
        type: String,
        enum: ["Web Development", "Android Development"],
        required: [true, "Type is required"]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: ["true", "UserId is required"]
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    issues: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Issue'
    }],
    createdOnDate: {
        type: Date,
        default: Date.now()
    },
    duration: {
        type: Date,
        default: Date.now + 1 * 12 * 365 * 24 * 60 * 60 * 1000
    }
})

projectSchema.pre("deleteOne", async function(next) {
    try {
        projectId = this.getQuery._id;
        await UserProjectIssueRelation.deleteMany({ projectId: projectId });
        await UserProjectRelationModel.deleteMany({ projectId: projectId });
        next()
    } catch (error) {
        next(error);
    }
})
const ProjectModel = mongoose.model("Project", projectSchema);
export default ProjectModel;