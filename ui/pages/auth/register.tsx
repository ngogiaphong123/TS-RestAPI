import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
const createUserSchema = object({
    name: string({}).min(1, "Name is required"),
    email: string({
        required_error: "Email is required",
    }).email("Not a valid email address."),
    password: string({
        required_error: "Password is required",
    }).min(6, "Password must be at least 6 characters"),
    passwordConfirmation: string({
        required_error: "Password confirm is required",
    }).min(6, "Password confirm must be at least 6 characters"),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Password do not match. Please try again",
    path: ["passwordConfirmation"],
});

type CreateUserInput = TypeOf<typeof createUserSchema>;
function RegisterPage() {
    const router = useRouter();
    const [registerError, setRegisterError] = useState(null);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<CreateUserInput>({
        resolver: zodResolver(createUserSchema),
    });
    const onSubmit = async (values: CreateUserInput) => {
        try {
            console.log(process.env.NEXT_PUBLIC_SERVER_ENDPOINT)
            console.log(values);
            await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users`,
                values
            );
            router.push("/");
        } catch (error: any) {
            setRegisterError(error.message);
        }
    };
    return (
        <>
            <p>{registerError}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-element">
                    <label htmlFor="email">Email: </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="jane.doe@example.com"
                        {...register("email")}
                    />
                    <p>{errors.email?.message}</p>
                </div>
                <div className="form-element">
                    <label htmlFor="name">Name: </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="jane"
                        {...register("name")}
                    />
                    <p>{errors.name?.message}</p>
                </div>

                <div className="form-element">
                    <label htmlFor="password">Password: </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="********"
                        {...register("password")}
                    />
                    <p>{errors.password?.message}</p>
                </div>

                <div className="form-element">
                    <label htmlFor="passwordConfirmation">Password confirmation: </label>
                    <input
                        id="passwordConfirmation"
                        type="password"
                        placeholder="********"
                        {...register("passwordConfirmation")}
                    />
                    <p>{errors.passwordConfirmation?.message}</p>
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default RegisterPage;
