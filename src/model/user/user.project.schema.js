import mongoose from "mongoose";

const userProjectRelation = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "UserId is required"]
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: [true, "ProjectId is required"]
    }
});

const UserProjectRelationModel = mongoose.model("UserProjectRelation", userProjectRelation);

export default UserProjectRelationModel;