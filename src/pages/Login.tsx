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
        <form className="cols-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="">Username</label>
                <input className="form-control" {...register("username", {
                    required: "Username is required"
                })} type="text" placeholder="Username" />
                {errors.username && <p>{errors.username.message}</p>}
            </div>
            <div className="mb-3">
                <label htmlFor="">Password</label>
                <input className="mb-4 form-control" type="password" {...register("password", {
                    required: "Password is required"
                })} placeholder="Password" />
                {errors.password && <p>{errors.password.message}</p>}
            </div>

            <button className="btn btn-success">Submit</button>
        </form>
        <Footer/>
        </>
    )
}

export default Login;