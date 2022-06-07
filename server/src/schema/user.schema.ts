import {object,string,TypeOf} from 'zod'
export const createUserSchema = object ({
    body : object({
        name : string({
            required_error : "Name is required"
        }),
        email : string({
            required_error : "Email is required"
        }).email("Not a valid email address."),
        password : string({
            required_error : "Password is required"
        }).min(6,"Password must be at least 6 characters"),
        passwordConfirmation : string({
            required_error : "Password confirm is required"
        }).min(6,"Password confirm must be at least 6 characters")
    }).refine((data) => data.password === data.passwordConfirmation, {
        message : "Password do not match. Please try again",
        path : ["passwordConfirmation"]
    })
})

export type createUserInput = Omit<TypeOf<typeof createUserSchema>,"body.passwordConfirmation">;