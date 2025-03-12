import { useForm } from "react-hook-form";

import Footer from "../components/Footer";
import NarBar from "../components/NarBar";
import { UserLogin } from "../types";
import { userLogin } from "../helpers/api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";


const Login: React.FC = () => {

    const navigate = useNavigate()

    useEffect(()=> {
        
        if (localStorage.getItem("access")){
            navigate("/")
        }
    }, [])

    const {register, handleSubmit, formState: {errors}} = useForm<UserLogin>()

    const mutation = useMutation({
        mutationFn: (data: UserLogin)=> userLogin(data),
        onSuccess: () => navigate("/"),
        onError: () => alert("No user exists")
    })
    
    const onSubmit = (data: UserLogin) => {
        if (!localStorage.getItem("access") && !localStorage.getItem("refresh")){
            
            mutation.mutate(data)
            
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
            {mutation.isPending ? (
                <button className="btn btn-success">Submitting ......</button>
            ): (
                <button className="btn btn-secondary">Submit</button>
            )}
        </form>
        <Footer/>
        </>
    )
}

export default Login;