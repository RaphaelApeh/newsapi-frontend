import axios from "axios"
import type { Posts, UserLogin, UserRegister } from "../types"

export const BASE_API_ENDPOINT: string = "http://127.0.0.1:8000/api/"

export const api = axios.create({"baseURL": BASE_API_ENDPOINT, headers: {
    "Content-Type": "application/json"
}})


api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access");
    if (token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
},
    (error) =>{
        return Promise.reject(error)
    }
)

export const getPosts = async (page: number) => {
    try{
        const response  = await api.get(`posts/?posts=${page}`);

        return response.data.posts
    }catch(error){
        
        throw new Error("something went wrong :(")
    }
}

export const createPost = async (data: Posts) => {
    try{
        const response  = await api.post("posts/", data)
        return response.data
    }catch(error){
        throw new Error("Error .....")
    }
}


export const deletePost = async (slug: string) => {

    try{
        await api.delete(`posts/${slug}/`)
    }catch(error){
        throw new Error("Error ....")
    }
}


export const updatePost = async (slug: string, data: Posts) => {
    try{
        await api.put(`posts/${slug}/`, data)
    }catch(error){
        throw new Error("Error ......")
    }
}

export const getPost = async (slug: string) => {
    try{
        const response = await api.get(`posts/${slug}/`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access")}`
            }
        });

        return response.data

    }catch(error){
        throw new Error("Something went wrong :(")
    }
}

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