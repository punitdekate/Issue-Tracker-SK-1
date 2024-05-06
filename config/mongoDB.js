import mongoose from "mongoose";

export const connectToMongoose = async() => {
    try {
        mongoose.connect(process.env.DB_URL);
        console.log("MongoDB is connected");
    } catch (error) {
        console.log(error);
    }
}