import { useEffect, useState } from "react";

import { Posts } from "../types";
import { BASE_API_ENDPOINT } from "../helpers/api";
import { Link } from "react-router-dom";
import NarBar from "../components/NarBar";
import Post from "../components/Post";

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
        <NarBar/>   

        <section>
        <div className="container">
            <h1 className="editor-h1">Editor Picks</h1>
            <div className="articles">
                {posts.map((post)=>(
                    <Post {...post} />
                ))}
            </div>

        </div>
    </section>
        </>
    )
}

export default Home;