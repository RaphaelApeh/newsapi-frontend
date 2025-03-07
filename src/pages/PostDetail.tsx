import { useParams } from "react-router-dom"
import { BASE_API_ENDPOINT } from "../helpers/api"
import { useEffect, useState } from "react";
import { type Posts } from "../types";


export const PostDetail = ()=> {

    const { slug } = useParams()
    const [page, setPage] = useState<Posts>({
        user: {
            username: "",
            email: "",
            get_full_name: ""
        },
        id: 0,
        title : "",
        truncated_content: "",
        content: "",
        slug: "",
        image: "",
        comments: [],
        active: true,
        timestamp: ""
    })

    const [loading, setloading] = useState<boolean>(true)

    useEffect(()=> {
    
        getPost()
    
    }, [])

    const getPost = async ()=>{
        try{
            const response = await fetch(`${BASE_API_ENDPOINT}posts/${slug}/`);
            const data = await response.json();
            setPage(data)
            if (response.status >= 400) setloading(false)
            if (loading) return <h1>No Content</h1>
        }catch(error){
            console.log(error)
        }
    
    }
    if (!loading) return <h1>No Content</h1>
    return (
        <>
            {loading ?<div>
                <h1>{page.user.username} {page.id}</h1>
            <small>
                <img src={page.image} alt="" />
                {page.content}
            </small>
            <h1>
                {page.comments?.length}
            </h1>
            </div> : "No Content"}
        </>
    )
}