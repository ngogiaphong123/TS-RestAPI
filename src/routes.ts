import {Express, Request, Response} from "express"
import { createUserHandler } from "./controller/user.controller";
function routes(app : Express) {
    app.get("/healthcheck" , (req : Request , res : Response) => {
        res.send("OK");
    })
    app.post('/api/users' , createUserHandler)
}

export default routes;