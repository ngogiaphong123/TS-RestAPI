import express from "express";
import config from "config";
import connect from "../utils/connectDB"
const port = config.get<number>("port");
const app = express();


app.listen(port , async () => {
    console.log("Server is running on port 1337");
    await connect()
})