import axios from "axios"
import { UserLogin, UserRegister } from "../types"


export const BASE_API_ENDPOINT: string = "http://127.0.0.1:8000/api/"

export const api = axios.create({"baseURL": BASE_API_ENDPOINT, headers: {
    "Content-Type": "application/json"
}})

export const registerUser = async (data: UserRegister) => {
    try{
        const response = await api.post("users/", data)
        console.log(response.status)
    
    }catch(err){
        console.log(err)
        alert("Username or Email is taken.")
    }

}

export const userLogin = async (data: UserLogin) => {
    try{
        const response = await api.post("token/", data)
        if(response.status >= 400) throw new Error("an error orcured")
        const responseData = response.data
        console.log(responseData)
        localStorage.setItem("access", responseData?.access)
        localStorage.setItem("refresh", responseData?.refresh)
        localStorage.setItem("username", responseData?.username)
        localStorage.setItem("user_id", responseData?.user_id)
    }catch(error: unknown){
        //@ts-ignore
        throw new Error(error?.message)
    }
}