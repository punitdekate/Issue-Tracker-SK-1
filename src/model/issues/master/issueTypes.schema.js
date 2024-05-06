import mongoose from "mongoose";

const issueType = new mongoose.Schema({
    type: {
        type: String,
        unique: [true, "Issue type should be unique"]
    }
})

const issueTypeModel = mongoose.model('IssueType', issueType);
export default issueTypeModel;