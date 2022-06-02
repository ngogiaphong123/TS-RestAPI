import express from "express";
import config from "config";
import connect from "./utils/connectDB"
import logger from "./utils/logger"
import routes from "./routes"
const port = config.get<number>("port");
const app = express();


app.listen(port , async () => {
    logger.info(`Server started on port ${port}`);
    await connect();
    routes(app);
})