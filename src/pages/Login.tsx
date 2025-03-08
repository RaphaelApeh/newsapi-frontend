import { useForm } from "react-hook-form";

import Footer from "../components/Footer";
import NarBar from "../components/NarBar";
import { UserLogin } from "../types";

const Login: React.FC = () => {

    const {register, handleSubmit, watch, formState: {errors}} = useForm<UserLogin>()
    console.log(watch("username"))
    const onSubmit = (data: UserLogin) => console.log(data)
    return (
        <>
        <NarBar/>
        <h1>Login</h1>    
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="">Username</label>
            <input {...register("username", {
                required: "Username is required"
            })} type="text" placeholder="Username" />
            {errors.username && <p>{errors.username.message}</p>}

            <label htmlFor="">Password</label>
            <input type="password" {...register("password", {
                required: "Password is required"
            })} placeholder="Password" />
            {errors.password && <p>{errors.password.message}</p>}

            <button>Submit</button>
        </form>
        <Footer/>
        </>
    )
}

export default Login;