import { useEffect, useState } from "react";

import { Posts } from "../types";
import { BASE_API_ENDPOINT } from "../helpers/api";

import NarBar from "../components/NarBar";
import Post from "../components/Post";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = ()=> {
    
    const [posts, setPosts] = useState<Posts[]>([])
    const [loading, setloading] = useState<boolean>(true)

    useEffect(()=>{
        getPosts()
    }, [])

    const getPosts = async ()=>{
        try{
            const response = await fetch(`${BASE_API_ENDPOINT}posts/`);
            const data = await response.json()
            setPosts(data.posts)
            if (response.status >= 400) setloading(false)
        }catch(error){
            setPosts([])
            setloading(false)
            console.log(error)
        }
    }
    return (
        <>
        <NarBar/>   
        <Header/>
        <section>
        <div className="container">
            <h1 className="editor-h1">Editor Picks</h1>
            <div className="articles">
                {loading ? posts.map((post)=>(
                    <Post {...post} />
                )) : <a className="card">
                    <img src="" alt="" />
            <article>
                <p className="entertainment-category">Error</p>
                <h3>No Content</h3>
                <p>
                    404
                </p>
            </article>
                    </a>}
            </div>

        </div>
    </section>
    <Footer />
        </>
    )
}

export default Home;