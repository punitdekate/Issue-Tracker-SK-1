import UserProjectIssueRelation from "./user.project.issue.Schema.js";
import UserProjectRelationModel from "./user.project.schema.js";
import UserModel from "./user.schema.js";
import crypto from "crypto";

export default class UserRepository {
    async createUser(userData) {
        try {
            const user = new UserModel(userData);
            const createdUser = await user.save();
            return createdUser;
        } catch (error) {
            console.log(error);
        }
    }

    async findUser(factor) {
        try {
            return await UserModel.findOne(factor);
        } catch (error) {
            console.log(error);
        }
    }

    async findUserWithSelect(factor) {
        try {
            return await UserModel.findOne(factor).select('-password');
        } catch (error) {
            console.log(error);
        }
    }

    async findAllUser(factor) {
        try {
            return await UserModel.find(factor);
        } catch (error) {
            console.log(error);
        }
    }
    async verifyResetOtp(otp) {
        const hashToken = crypto
            .createHash("sha256")
            .update(otp)
            .digest("hex");
        return await UserModel.findOne({
            restPasswordToken: hashToken,
            resetPasswordTokenExpiry: { $gt: Date.now() },
        });
    }


    async getUserSpecificProject(projectId) {
        try {
            return await UserProjectRelationModel.find({ projectId: projectId }).populate('userId').populate('projectId');
        } catch (error) {
            console.log(error);
        }
    }

    async getIssuesSpecificToProject(projectId) {
        try {
            return await UserProjectIssueRelation.find({ projectId: projectId }).populate("userId").populate('projectId').populate('issueId');
        } catch (error) {
            console.log(error);
        }
    }


}