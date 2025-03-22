import { useState } from "react";

import { Posts } from "../types";
import { getPosts } from "../helpers/api";

import NarBar from "../components/NarBar";
import Post from "../components/Post";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";

const Home = ()=> {
    //@ts-ignore    
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState<string>("")

    const { data, isLoading, isPending, isError } = useQuery(
        {
            queryKey: ["posts"],
            queryFn: () => getPosts(page),
            staleTime: 2000
        }
    )

    if (isLoading || isPending) return( 
        <div className="preloader">
            <div></div>
            <div>Loading ....</div>
        </div>
    )

    if (isError) return <h1>Something went wrong :(</h1>

    return (
        <>
        <NarBar />
        <Header/>
        <div className="mt-12">
            <h5 className="mt-4 mb-4 text-center text-success">Search ......</h5>
            <input type="search" onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Search ..." className="mt-12 form-control" />
        </div>
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