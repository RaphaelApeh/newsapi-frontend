import { useEffect, useState } from "react";

import { Posts } from "../types";
import { BASE_API_ENDPOINT } from "../helpers/api";
import { Link } from "react-router-dom";


const Home = ()=> {
    
    const [posts, setPosts] = useState<Posts[]>([])

    useEffect(()=>{
        getPosts()
    }, [])

    const getPosts = async ()=>{
        try{
            const response = await fetch(`${BASE_API_ENDPOINT}posts/`);
            const data = await response.json()
            setPosts(data.posts)
        }catch(error){
            setPosts([])
            console.log(error)
        }
    }
    return (
        <>
        <h1>Hello World</h1>

        {posts.map((post)=>(
        <small key={post.id}>
            Title: {post.title}
            image: <img src={post.image} width={100} alt="" />
            User: {post.user?.username}
            <Link to={`posts/${post.slug}`}>Detail</Link><br/>
        </small>)
        )}
        </>
    )
}

export default Home;