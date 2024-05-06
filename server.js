import { server } from "./index.js";
import { connectToMongoose } from "./config/mongoDB.js";
import path from 'path';
import dotenv from 'dotenv';
const configEnvPath = path.resolve('config', '.env');
dotenv.config({ path: configEnvPath });

server.listen(process.env.PORT_NUMBER, async(err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is listening on port no. ${process.env.PORT_NUMBER}`);
        await connectToMongoose();
    }

});