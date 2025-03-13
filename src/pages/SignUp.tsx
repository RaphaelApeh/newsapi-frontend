import { useForm } from "react-hook-form";

import Footer from "../components/Footer";
import NarBar from "../components/NarBar";
import { type UserRegister } from "../types";
import { registerUser } from "../helpers/api";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const SignUp: React.FC = () => {

    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: (data: UserRegister) => registerUser(data),
        onSuccess: () => navigate("/login")
    })
    const { 
        register, 
        handleSubmit,
        watch,
        formState: { errors }, 
    } = useForm<UserRegister>()

    const password = watch("password")

    const onSubmit = (data: UserRegister) => {
        
        mutation.mutate(data)
    }
    return (
        <>
        <NarBar/>
            <h1>Sign Up</h1>
            {mutation.isError ? (
                <h4 className="error">Username or Email already exists.</h4>
            ): ""}
            <form onSubmit={handleSubmit(onSubmit)} className="control">
                <input {...register("username", {required: "Username is required"})} type="text" placeholder="Username" className="mb-4 form-control" />
                {errors.username && <p>{errors.username.message}</p>}

                <input {...register("email", { required: "Email is required"})} type="email" placeholder="Email" className="mb-4 form-control" />
                {errors.email && <p>{errors.email.message}</p>}

                <input {...register("password", { required: "Password is Required", minLength: 8})} type="password" placeholder="Password" className="mb-4 form-control" />
                {errors.password && <p>{errors.password.message}</p>}

                <input type="password" {...register("password2", { required: "Confirm Password", validate: (value)=> value === password || "Password not match."})} placeholder="Confirm Password" className="mb-4 form-control" />
                {errors.password2 && <p>{errors.password2.message}</p>}

                {mutation.isError ? (
                    <button className="btn btn-danger">Error</button>
                ): (
                    mutation.isPending ? (
                        <button className="btn btn-success">Submitting ...</button>
                    ) : (
                        <button className="btn btn-secondary">Submit</button>
                    )
                )}
            </form>
        <Footer/>
        </>
    )
}

export default SignUp;