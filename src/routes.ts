import { createUserSchema } from './schema/user.schema';
import {Express, Request, Response} from "express"
import { createUserHandler } from "./controller/user.controller";
import validate from "./middleware/validateResource";
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler } from './controller/session.controller';
import { createSessionSchema } from './schema/session.schema';
import requireUser from './middleware/requireUser';
function routes(app : Express) {
    app.get("/healthcheck" , (req : Request , res : Response) => {
        res.send("OK");
    })
    app.post('/api/users' ,validate(createUserSchema) ,createUserHandler)
    app.post('/api/sessions' ,validate(createSessionSchema) ,createUserSessionHandler)
    app.get('/api/sessions',requireUser,getUserSessionsHandler)
    app.delete('/api/sessions',requireUser,deleteSessionHandler)
}

export default routes;