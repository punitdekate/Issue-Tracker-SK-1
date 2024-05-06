import mongoose from "mongoose";

const issueStatus = new mongoose.Schema({
    status: {
        type: String,
        unique: [true, "Status should be unique"]
    }
})

const issueStatusModel = mongoose.model('IssueStatus', issueStatus);
export default issueStatusModel;