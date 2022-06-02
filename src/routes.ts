import { createUserSchema } from './schema/user.schema';
import {Express, Request, Response} from "express"
import { createUserHandler } from "./controller/user.controller";
import validate from "./middleware/validateResource";
function routes(app : Express) {
    app.get("/healthcheck" , (req : Request , res : Response) => {
        res.send("OK");
    })
    app.post('/api/users' ,validate(createUserSchema) ,createUserHandler)
}

export default routes;