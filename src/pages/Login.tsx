import { useForm } from "react-hook-form";

import Footer from "../components/Footer";
import NarBar from "../components/NarBar";
import { UserLogin } from "../types";
import { userLogin } from "../helpers/api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Login: React.FC = () => {

    const navigate = useNavigate()

    useEffect(()=> {
        
        if (localStorage.getItem("access")){
            navigate("/")
        }
    }, [])

    const {register, handleSubmit, reset, formState: {errors}} = useForm<UserLogin>()

    const onSubmit = (data: UserLogin) => {
        if (!localStorage.getItem("access") && !localStorage.getItem("refresh")){
            userLogin(data)
            console.log(data)
            reset()
            setTimeout(() => {
                navigate("/")
            }, 3000)
        }else{
            alert("error")
        }

    }
    
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