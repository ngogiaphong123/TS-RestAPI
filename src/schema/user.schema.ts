import {object,string} from 'zod'
export const createUSerSchema = object ({
    body : object({
        name : string({
            required_error : "Name is required"
        }),
        email : string({
            required_error : "Email is required"
        }),
        password : string({
            required_error : "Password is required"

        }).min(6,"Password must be at least 6 characters"),
        passwordConfirm : string()
    })
})