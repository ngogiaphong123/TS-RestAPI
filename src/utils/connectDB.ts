import mongoose from "mongoose";
import config from "config";
import logger from './logger'
async function connect()  {
    const db = config.get<string>("dbUri");
    try {
        await mongoose.connect(db);
        logger.info("Connected to MongoDB");
    }
    catch (err) {
        logger.error("Could not connect to MongoDB");
        process.exit(1);
    }
}

export default connect;