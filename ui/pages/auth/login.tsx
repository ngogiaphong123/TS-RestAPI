import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
const createSessionSchema = object({
    email: string({}).min(1,"Email is required"),
    password: string({}).min(6,"password must be at least 6 characters long")
})

type CreateSessionInput = TypeOf<typeof createSessionSchema>;
function LoginPage() {
    const router = useRouter();
    const [loginError, setLoginError] = useState(null);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<CreateSessionInput>({
        resolver: zodResolver(createSessionSchema),
    });
    const onSubmit = async (values: CreateSessionInput) => {
        try {
            console.log(process.env.NEXT_PUBLIC_SERVER_ENDPOINT)
            console.log(values);
            await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
                values,
                {withCredentials : true}
            );
            router.push("/");
        } catch (error: any) {
            setLoginError(error.message);
        }
    };
    return (
        <>
            <p>{loginError}</p>
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
                    <label htmlFor="password">Password: </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="********"
                        {...register("password")}
                    />
                    <p>{errors.password?.message}</p>
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default LoginPage;
