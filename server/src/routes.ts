import { createUserSchema } from './schema/user.schema';
import {Express, Request, Response} from "express"
import { createUserHandler,getCurrentUSer } from "./controller/user.controller";
import validate from "./middleware/validateResource";
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler } from './controller/session.controller';
import { createSessionSchema } from './schema/session.schema';
import requireUser from './middleware/requireUser';
import {createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema} from "./schema/product.schema"
import {createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler} from "./controller/product.controller"
function routes(app : Express) {
    app.get("/healthcheck" , (req : Request , res : Response) => {
        res.send("OK");
    })
    //? User and sessions routes
    app.get('/api/me' , requireUser, getCurrentUSer)
    app.post('/api/users' ,validate(createUserSchema) ,createUserHandler)
    app.post('/api/sessions' ,validate(createSessionSchema) ,createUserSessionHandler)
    app.get('/api/sessions',requireUser,getUserSessionsHandler)
    app.delete('/api/sessions',requireUser,deleteSessionHandler)
    //? Product routes
    app.post("/api/products", [requireUser,validate(createProductSchema)], createProductHandler)
    app.put("/api/products/:productId", [requireUser,validate(updateProductSchema)], updateProductHandler)
    app.get("/api/products/:productId", validate(getProductSchema), getProductHandler)
    app.delete("/api/products/:productId", [requireUser,validate(deleteProductSchema)], deleteProductHandler)
}

export default routes;