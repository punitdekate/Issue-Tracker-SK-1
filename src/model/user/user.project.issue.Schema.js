import mongoose from "mongoose";

const userProjectIssueRelation = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "UserId is required"]
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: [true, "ProjectId is required"]
    },
    issueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue",
        required: [true, "IssueId is required"]
    }
});

const UserProjectIssueRelation = mongoose.model("UserProjectIssueRelation", userProjectIssueRelation);

export default UserProjectIssueRelation;