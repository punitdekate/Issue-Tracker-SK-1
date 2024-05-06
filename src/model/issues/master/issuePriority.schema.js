import mongoose from "mongoose";

const issuePriority = new mongoose.Schema({
    priority: {
        type: String,
        unique: [true, "Priority should be unique"]
    }
})

const issuePriorityModel = mongoose.model('IssuePriority', issuePriority);
export default issuePriorityModel;