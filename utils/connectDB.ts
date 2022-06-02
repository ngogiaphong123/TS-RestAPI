import mongoose from "mongoose";
import config from "config";

async function connect()  {
    const db = config.get<string>("dbUri");
    try {
        await mongoose.connect(db);
        console.log("Connected to MongoDB");
    }
    catch (err) {
        console.error("Could not connect to MongoDB");
        process.exit(1);
    }
}

export default connect;