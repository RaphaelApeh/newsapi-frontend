import { useForm } from "react-hook-form";

import Footer from "../components/Footer";
import NarBar from "../components/NarBar";
import { type UserRegister } from "../types";
import { registerUser } from "../helpers/api";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {

    const navigate = useNavigate()

    const { 
        register, 
        handleSubmit,
        watch,
        formState: { errors }, 
    } = useForm<UserRegister>()

    const password = watch("password")

    const onSubmit = (data: UserRegister) => {
        registerUser(data)
        navigate("/login")
    }

    return (
        <>
        <NarBar/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("username", {required: "Username is required"})} type="text" placeholder="Username" />
                {errors.username && <p>{errors.username.message}</p>}

                <input {...register("email", { required: "Email is required"})} type="email" placeholder="Email" />
                {errors.email && <p>{errors.email.message}</p>}

                <input {...register("password", { required: "Password is Required", minLength: 8})} type="password" placeholder="Password" />
                {errors.password && <p>{errors.password.message}</p>}

                <input type="password" {...register("password2", { required: "Confirm Password", validate: (value)=> value === password || "Password not match."})} placeholder="Confirm Password" />
                {errors.password2 && <p>{errors.password2.message}</p>}

                <button>Submit</button>
            </form>
        <Footer/>
        </>
    )
}

export default SignUp;