import axios from "axios"
import { UserRegister } from "../types"


export const BASE_API_ENDPOINT: string = "http://127.0.0.1:8000/api/"

export const api = axios.create({"baseURL": BASE_API_ENDPOINT})

export const registerUser = async (data: UserRegister) => {
    try{
        const response = await api.post("users/", data, {"headers": {"Content-Type": "application/json"}})
        console.log(response.status)
    
    }catch(err){
        console.log(err)
        alert("Username or Email is taken.")
    }

}