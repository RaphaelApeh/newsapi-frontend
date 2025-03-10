import { useEffect, useState } from "react";

import { Posts } from "../types";
import { BASE_API_ENDPOINT, getPosts } from "../helpers/api";

import NarBar from "../components/NarBar";
import Post from "../components/Post";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";

const Home = ()=> {
    
    const [page, setPage] = useState(1)


    const { data, isLoading } = useQuery(
        {
            queryKey: ["posts"],
            queryFn: () => getPosts(page),
            staleTime: 2000
        }
    )

    if (isLoading) return <h1>Loading ....</h1>

    return (
        <>
        <NarBar/>   
        <Header/>
        <section>
        <div className="container">
            <h1 className="editor-h1">Editor Picks</h1>
            <div className="articles">

                {data.map((post: Posts)=>(
                    <div key={post.id}><Post {...post} /> </div>
                )) }
            </div>

        </div>
    </section>
    <Footer />
        </>
    )
}

export default Home;