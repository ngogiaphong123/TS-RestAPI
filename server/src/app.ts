import express from "express";
import config from "config";
import connect from "./utils/connectDB"
import cookieParser = require("cookie-parser");
import logger from "./utils/logger"
import routes from "./routes"
import deserializeUser from "./middleware/deserializeUser"
import cors from 'cors'
const port = config.get<number>("port");
const app = express();
app.use(cors({
    origin : config.get<string>("origin"),
    credentials : true,
}))
app.use(cookieParser())
app.use(express.json());
app.use(deserializeUser);
app.listen(port , async () => {
    logger.info(`Server started on port ${port}`);
    await connect();
    routes(app);
})